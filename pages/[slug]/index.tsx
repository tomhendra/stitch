import Link from 'next/link';
import Head from 'next/head';
import slugify from 'slugify';
import { Container, Heading } from '@chakra-ui/react';
import {
  getSearchEndpoint,
  getChannelsEndpoint,
  getPlaylistEndpoint,
} from '~/helpers/youtube-api.helper';
import {
  channelListSampleData,
  channelSampleData,
  playListSampleData,
} from '~/data';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Channel, Video } from '~/models/api';

type Props = {
  channel: Channel;
};

function Channel({ channel }: Props) {
  return (
    <>
      <Head>
        <title>User channel</title>
        <meta name="description" content="User description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <pre>{JSON.stringify(channel, null, 2)}</pre> */}

      <Heading
        lineHeight={1.1}
        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
      >
        {channel.title}
      </Heading>
      <p>{channel.about}</p>
      <div>
        {channel.videos.map((video: any) => (
          <p key={video.id}>{video.title}</p>
        ))}
      </div>
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
    TODO same search query in both channel & home routes no es bueno 
    ! Data could be different between routes 🪲
    research React context for next - presumably you can share UI data
    between routes with Next!?  ¯\_(ツ)_/¯ 
  */

  // const ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const data = await res.json();
  // ! Went over the API req quota so span up a new app on GCP & sampling data!
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

// @ts-ignore
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

  // const SEARCH_ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const searchRes = await fetch(`${SEARCH_ENDPOINT}`);
  // const searchData = await searchRes.json();
  // ! Went over the API req quota so span up a new app on GCP & sampling data!
  const searchData = channelListSampleData;

  const channel = searchData.items.find((item: any) => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === slug;
  });

  // const CHANNEL_ENDPOINT = getChannelsEndpoint(channel.id.channelId);
  // const channelRes = await fetch(`${CHANNEL_ENDPOINT}`);
  // const channelData = await channelRes.json();
  // ! Went over the API req quota so span up a new app on GCP & sampling data!
  const channelData = channelSampleData;

  // const PLAYLIST_ENDPOINT = getPlaylistEndpoint(channel.id.channelId, 12);
  // const playlistRes = await fetch(`${PLAYLIST_ENDPOINT}`);
  // const playlistData = await playlistRes.json();
  // ! Went over the API req quota so span up a new app on GCP & sampling data!
  const playlistData = playListSampleData;

  const title: string = channelData.items[0].snippet.title;
  const about: string = channelData.items[0].snippet.description;
  const channelId: string = channelData.items[0].id;
  const videos: Video[] = [];

  playlistData.items.forEach((video: any) => {
    videos.push({
      videoId: video.id,
      title: video.snippet.title,
    });
  });

  return {
    props: {
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
