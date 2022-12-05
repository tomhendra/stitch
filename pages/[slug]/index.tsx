import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import {
  ArrowUpRight,
  Layout,
  Main,
  MaxWidthContainer,
  Navbar,
  Sidebar,
  VideoPlayer,
} from '~/components';
import {
  AboutTabPanel,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  VideoTabPanel,
} from '~/components/ChannelTabs';
import { Chat } from '~/components/Chat';
import { sampleChannelsSearchData, sampleVideosQueryData } from '~/data/api';
import { getYouTubeVideosEndpoint } from '~/helpers/youtube-api.helper';
import type { ChannelVideosQueryData } from '~/models/api';
import type { Channel, Video } from '~/models/app';
import { getDataWithFetch, sampleOne } from '~/utils';

// import { DataDebugger } from '~/components';

// !! 🔥 FLIP TO *TRUE* BEFORE PUSHING TO PROD !! 🔥
const USE_ACTUAL_API_VIDEO_DATA = false;
const AUTOPLAY_VIDEO = false;
/* 

    TODO consider https://<url>/channels/[slug] url structure
    https://nextjs.org/learn/seo/rendering-and-ranking/url-structure
    TODO generate OG images from channel thumbnail
    TODO go further with Open Graph https://ogp.me/
    TODO generate structured data & JSON-LD https://schema.org/docs/documents.html
    TODO dynamically import modules 
    https://nextjs.org/learn/seo/improve/dynamic-imports
    https://nextjs.org/learn/seo/improve/dynamic-import-components
*/

type Props = {
  channel: Channel;
  channels: Channel[];
};

function Channel({ channel, channels }: Props) {
  /* currentVideo state is shared by VideoPlayer & VideoTabPanel so is  
    "lifted up" here — the nearest parent. */
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  //  Chat open / close state
  const { isOpen, onOpen, onClose } = useDisclosure();
  // DOM ref required for button that toggles Chat
  const btnRef = useRef();

  useEffect(() => {
    // set a random video to play on component mount + on page navigation
    setCurrentVideo(channel.videos ? sampleOne(channel.videos) : null);
  }, [channel.videos]);

  return (
    <>
      <Head>
        {/* use keywords in the title for improved SEO */}
        <title>{channel.title} | video streaming channel - Stitch</title>
        <meta name="description" content={channel.about} key="desc" />
        <meta name="robots" content="all" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Stitch" />
        <meta property="og:description" content="Get social with Stitch" />
        <meta property="og:image" content="https://postimg.cc/w3Vk5FJ0" />
      </Head>

      {/* <DataDebugger data={channelVideosQueryData} /> */}

      <Layout>
        <Navbar />
        <Sidebar channels={channels} />
        <Main>
          <Container maxW="2000px" p={0}>
            <Box px={[0, 0, 6, 10]} py={[0, 0, 6, 10]}>
              <VideoPlayer
                video={currentVideo || null}
                autoplay={AUTOPLAY_VIDEO}
              />
            </Box>
          </Container>
          <MaxWidthContainer>
            <Flex
              direction="column"
              py={6}
              px={[2, 4, 6, 10]}
              gap={[4, 8]}
              justifyContent="space-between"
            >
              <Heading as="h1" lineHeight={1.1} fontSize={['2xl', '4xl']}>
                {channel.title ? channel.title : 'Untitled channel'}
              </Heading>

              <Tabs>
                <TabList>
                  <Tab>Home</Tab>
                  <Tab>About</Tab>
                  {/* The Compound Components pattern allows us to locate our 
                  Chat toggle button inside the tab list, like Twitch does, 
                  even though it is functionally unrelated to the tabs. 
                  This allows React to generate semantic DOM tree and avoids CSS 
                  position hacks such as the ones I have seen in the wild! */}
                  <Button
                    leftIcon={<ArrowUpRight h="24px" w="24px" />}
                    // TODO fix this later
                    // @ts-ignore
                    ref={btnRef}
                    colorScheme="purple"
                    onClick={onOpen}
                    size="md"
                    variant="link"
                    fontWeight="bold"
                    p={4}
                  >
                    Chat
                  </Button>
                </TabList>
                <TabPanels>
                  <VideoTabPanel
                    videos={channel.videos ? channel.videos : null}
                    channelTitle={channel.title}
                    setCurrentVideo={setCurrentVideo}
                  />
                  <AboutTabPanel about={channel.about} />
                </TabPanels>
              </Tabs>
              <Chat
                channelTitle={channel.title}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Flex>
          </MaxWidthContainer>
        </Main>
      </Layout>
    </>
  );
}

/* 
  we can't create a static page for an infinite number of possibilities, (for
  every channel id there could ever be).

  we need to provide Next.js with a finite number of options so it can create 
  a page for each of them.

  we need to generate an array of paths for the getStaticPaths function.
*/
interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // ? using static data to simulate a database as explained in pages/index.tsx
  const channelSearchQueryData = sampleChannelsSearchData;

  if (!channelSearchQueryData.items) {
    throw new Error('error fetching channel data');
  }

  // TODO how to type getStaticPaths? - no info in Next docs! - remove "any"
  // https://www.vitamindev.com/next-js/getstaticprops-getstaticpaths-typescript/
  const paths: any = [];

  channelSearchQueryData.items.forEach(item => {
    paths.push({
      params: {
        slug: slugify(item.snippet.title).toLowerCase(),
      },
    });
  });

  return {
    paths,
    /* 
      if a user navigates to a path that doesn't exist in the paths array, 
    ` fallback: false` will cause Next to return a 404 page 
    */
    fallback: false,
  };
};

/* 
  Next.js will call the getStaticProps function for every path we've returned
  from getStaticPaths
*/
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // console.log({params});
  if (!params?.slug) {
    throw new Error('error getting slug from params');
  }

  // ? using static data to simulate a database as explained in pages/index.tsx
  const channelSearchQueryData = sampleChannelsSearchData;

  if (!channelSearchQueryData.items) {
    throw new Error('error fetching channel data');
  }
  /* 
    grab the current channel for this route by matching the slug on the params 
    object with the subscribed channel sample data entry. 
    
    slug comes from the filename [slug] — square brackets signify a dynamic route.
  */
  const channel = channelSearchQueryData.items.find(item => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === params.slug;
  });

  if (!channel) {
    throw new Error('channel not found');
  }

  const channels: Channel[] = [];
  /* 
    populate the channels array so that we only send data from the server that 
    is required to minimise bandwidth and compute expense.
  */
  channelSearchQueryData.items.forEach(item => {
    const { channelId, title, description, thumbnails } = item.snippet;

    channels.push({
      channelId: channelId,
      title: title,
      about: description,
      thumbnail: thumbnails.default.url || '/images/user-circle.png',
    });
  });

  /* 
    Now we hit the YouTube API to get videos for the channel 🎉. The GCP quota 
    is pretty low, so I've dumped some sample data to data/api.ts as with the 
    channel query which can be toggled with the USE_ACTUAL_API_VIDEO_DATA
    boolean at the top of this file.
  */

  const endpoint = getYouTubeVideosEndpoint({
    channelId: channel.snippet.channelId,
    maxResults: 4,
  });

  const channelVideosQueryData = USE_ACTUAL_API_VIDEO_DATA
    ? await getDataWithFetch<ChannelVideosQueryData>(endpoint)
    : sampleVideosQueryData;

  if (!channelVideosQueryData.items) {
    throw new Error('error fetching video data');
  }

  const { title, description, channelId, thumbnails } = channel.snippet;

  const about = description;
  const thumbnail = thumbnails.default.url;
  const videos: Video[] = [];

  channelVideosQueryData.items.forEach(video => {
    const { title, thumbnails } = video.snippet;

    videos.push({
      videoId: video.id.videoId,
      title: title,
      thumbnails: thumbnails,
    });
  });

  return {
    props: {
      channels,
      channel: {
        channelId,
        title,
        about,
        thumbnail,
        videos,
      },
    },
    revalidate: 5,
  };
};

export default Channel;
