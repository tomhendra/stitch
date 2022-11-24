import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
  VisuallyHidden,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import type { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import {
  Layout,
  Main,
  MaxWidthContainer,
  Navbar,
  Sidebar,
  VideoPlayer,
  ArrowUpRight,
} from '~/components';
import { Chat } from '~/components/Chat';
import {
  sampleChannelsSearchData,
  sampleVideosQueryData,
  sampleMessageData,
} from '~/data/api';
import { getChannelVideosQueryEndpoint } from '~/helpers/youtube-api.helper';
import type { ChannelVideosQueryData } from '~/models/api';
import type { Channel, Message, Video } from '~/models/app';
import type { MessageFormElement } from '~/components/Chat';
import { getDataWithFetch, sampleOne } from '~/utils/main';

import { DataDebugger } from '~/components';

// ! 🔥 FLIP TO *TRUE* BEFORE PUSHING TO PROD !! 🔥
const USE_ACTUAL_API_VIDEO_DATA = true;
const AUTOPLAY_VIDEO = true;

/* 
    SEO
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
  // Videos
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageBody, setMessageBody] = useState('');
  // Chat
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // On component mount populate video state variables
  useEffect(() => {
    setVideos(channel.videos || null);
    setCurrentVideo(channel.videos ? sampleOne(channel.videos) : null);
  }, [channel.videos]);

  /* 
    Handle the message and persist in component state. The messages are currently
    not associated with a channel, so remain the same across channel routes. 
    
    Take this as a minimum proof of concept that the form handling works..

    TODO create an auth flow and realtime chat
    - channel id for each message & database query with id to get messages for 
    current channel.
  */
  function handleMessage(event: React.FormEvent<MessageFormElement>) {
    event.preventDefault();

    const newMessage = {
      sender: 'Me',
      body: messageBody,
    };

    const updatedMessages = [...messages, newMessage];
    setMessageBody('');
    setMessages(updatedMessages);

    const randomMessage = sampleOne(sampleMessageData.items);

    setTimeout(() => {
      setMessages([...updatedMessages, randomMessage]);
    }, 1000);
  }

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
        <Navbar channel={channel} />
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

              <Tabs colorScheme="purple">
                <TabList fontWeight="bold">
                  <Tab>Home</Tab>
                  <Tab>About</Tab>
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
                  <TabPanel px={0}>
                    {videos ? (
                      <SimpleGrid
                        columns={[1, 1, 2, 3, 4]}
                        columnGap={[0, 0, 8]}
                        rowGap={[8, 8, 8, 8]}
                        w="full"
                        h="full"
                      >
                        {videos?.map(video => {
                          const { url } = video.thumbnails.medium;
                          return (
                            <Box
                              key={video.videoId}
                              onClick={() => setCurrentVideo(video)}
                              cursor="pointer"
                              w="full"
                              overflow="hidden"
                            >
                              <Box
                                transition="transform 150ms"
                                _hover={{
                                  transition: 'transform 250ms',
                                  transform: 'scale(1.06)',
                                }}
                              >
                                <Image
                                  alt={video.title}
                                  src={url}
                                  height={200}
                                  width={360}
                                />
                                <VisuallyHidden>
                                  video - {video.title}
                                </VisuallyHidden>
                              </Box>
                            </Box>
                          );
                        })}
                      </SimpleGrid>
                    ) : (
                      <Text>This channel has not uploaded any videos yet.</Text>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <Text>
                      {channel.about
                        ? channel.about
                        : 'No info has been provided about this channel.'}
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Chat
                isOpen={isOpen}
                onClose={onClose}
                channelTitle={channel.title}
                messages={messages}
                message={messageBody}
                onChange={e => setMessageBody(e.target.value)}
                onSubmit={handleMessage}
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

  if (!channelSearchQueryData) {
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
    /* if a user navigates to a path that doesn't exist in the paths array, 
    `fallback: false` will cause Next to return a 404 page */
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
  channelSearchQueryData.items.forEach(item =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      about: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.default.url || '/images/user-circle.png',
    }),
  );

  /* 
    Now we hit the YouTube API to get videos for the channel 🎉. The GCP quota 
    is pretty low - I have had to create 7 apps on GCP already! - so I've dumped 
    some sample data to data/api.ts as with the channel query. 
  */
  const endpoint = getChannelVideosQueryEndpoint(channel.snippet.channelId, 4);

  const channelVideosQueryData = USE_ACTUAL_API_VIDEO_DATA
    ? await getDataWithFetch<ChannelVideosQueryData>(endpoint)
    : sampleVideosQueryData;

  if (!channelVideosQueryData.items) {
    throw new Error('error fetching video data');
  }

  const title = channel.snippet.title;
  const about = channel.snippet.description;
  const channelId = channel.snippet.channelId;
  const thumbnail = channel.snippet.thumbnails.default.url;
  const videos: Video[] = [];

  channelVideosQueryData.items.forEach(video => {
    videos.push({
      videoId: video.id.videoId || '',
      title: video.snippet.title,
      thumbnails: video.snippet.thumbnails,
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
