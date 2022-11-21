import NextLink from 'next/link';
import Head from 'next/head';
import slugify from 'slugify';
import YouTube, { type YouTubeProps } from 'react-youtube';
import {
  AspectRatio,
  Container,
  Heading,
  Grid,
  GridItem,
  Flex,
  Link,
} from '@chakra-ui/react';
import {
  getSearchEndpoint,
  getChannelsEndpoint,
  getPlaylistEndpoint,
  getVideosFromChannel,
} from '~/helpers/youtube-api.helper';
import {
  channelListSampleData,
  channelSampleData,
  playListSampleData,
  videosSampleData,
} from '~/data';
import { Layout } from '~/components';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Channel, Video, ChannelList } from '~/models/api';
import { useEffect, useState } from 'react';
import { sampleOne } from '~/utils/main';

type Props = {
  channel: Channel;
  channels: ChannelList[];
};

function Channel({ channel, channels }: Props) {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    setVideos(channel.videos);
    setCurrentVideo(sampleOne(channel.videos));
  }, [channel.videos]);

  return (
    <>
      {/* <pre>{JSON.stringify(videosData, null, 2)}</pre> */}

      <Head>
        <title>User channel</title>
        <meta name="description" content="User description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* sidebar depends on data props so is duplicated in Home and 
          Channel routes. see comments in _app.tsx for more info */}
        <GridItem p={2} area={'sidebar'}>
          <Heading as="h2" fontSize="xl" marginBlockEnd={3}>
            For you
          </Heading>
          <Flex as="nav" direction="column" gap={1.5}>
            {channels?.map(channel => (
              <NextLink
                legacyBehavior
                passHref
                key={channel.channelId}
                href={`/${slugify(channel.title).toLowerCase()}`}
              >
                <Link noOfLines={1}>
                  <Heading as="p" fontSize="1xl">
                    {channel.title}
                  </Heading>
                </Link>
              </NextLink>
            ))}
          </Flex>
        </GridItem>
        <GridItem as="main" area={'main'}>
          {/* Video embed */}
          <AspectRatio maxW="560px" ratio={16 / 9}>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo?.videoId}`}
              // src={`https://www.youtube.com/embed/${currentVideo?.videoId}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </AspectRatio>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            {channel.title}
          </Heading>
          <p>{channel.about}</p>
          <div>
            {/* Channel videos */}
            <Heading>Videos</Heading>
            {videos?.map(video => (
              <p key={video.videoId}>{video.title}</p>
            ))}
          </div>
        </GridItem>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  /* 
    we can't create a static page for an infinite number of possibilities, (for
    every channel id there could ever be).

    we need to provide Next.js with a finite number of options so it can create 
    a page for each of them.

    we need to generate an array of paths for the getStaticPaths function.
  */

  /* 
    ! calling getSearchEndpoint multiple times in channel & home no es bueno... 
    ! the data could be different between calls, and therefore break routing 🪲  

    With a real app there would be a user object persisted to a database which
    would have an array of channels that the authenticated user has subscribed 
    to. This would be fetched from the database and used to query the API for 
    channel data.

    As far as I can tell there is no obvious way to query a consistent list of 
    channels from the YouTube API without using Search.
    https://developers.google.com/youtube/v3/docs/search
    
    The Google algorithm will generate a response based on the search query, in
    this case 'gaming' which we have no way of controlling for consistency. 
    
    To simulate a database we "get" data from /data.ts on the backend ¯\_(ツ)_/¯ 
  */

  // const ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const data = await res.json();
  const data = channelListSampleData;

  const paths: any = [];

  data.items.forEach((item: any) => {
    paths.push({
      params: {
        slug: slugify(item.snippet.title).toLowerCase(),
      },
    });
  });

  return {
    paths,
    /* if a user navigates to a path that doesn't exists in the paths array, 
    fallback: false will cause Next to return a 404 page */
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // fetch details for Channel from YouTube API

  /* 
    Next.js will call the getStaticProps function for every path we've returned
    from getStaticPaths
  */
  if (!params?.slug) {
    throw new Error('error generating path');
  }

  const slug: string = !Array.isArray(params.slug) ? params.slug : '';

  // ? burned the API quota, so created a new app on GCP & captured sample data!
  // const SEARCH_ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const searchRes = await fetch(`${SEARCH_ENDPOINT}`);
  // const searchData = await searchRes.json();
  const searchData = channelListSampleData;

  const channel = searchData.items.find((item: any) => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === slug;
  });

  const channels: ChannelList[] = [];

  searchData.items.forEach((item: any) =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
    }),
  );

  // ? burned the API quota, so created a new app on GCP & captured sample data!
  const VIDEOS_ENDPOINT = channel
    ? getVideosFromChannel(channel.id.channelId, 12)
    : '';
  const videosRes = await fetch(`${VIDEOS_ENDPOINT}`);
  const videosData = await videosRes.json();
  // const videosData = playListSampleData;

  const title: string = channel?.snippet.title || '';
  const about: string = channel?.snippet.description || '';
  const channelId: string = channel?.snippet.channelId || '';
  const videos: Video[] = [];

  videosData.items.forEach((video: any) => {
    videos.push({
      videoId: video.id.videoId,
      title: video.snippet.title,
    });
  });

  return {
    props: {
      channels,
      channel: {
        channelId,
        title,
        about,
        videos,
      },
    },
    revalidate: 5,
  };
};

export default Channel;
