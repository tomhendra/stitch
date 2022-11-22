import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
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
} from '~/components';
import { Chat } from '~/components/Chat';
import {
  sampleChannelSearchQueryData,
  sampleChannelVideosQueryData,
  sampleMessageData,
} from '~/data/api';
import { getChannelVideosQueryEndpoint } from '~/helpers/youtube-api.helper';
import type { ChannelVideosQueryData } from '~/models/api';
import type { Channel, Message, Video } from '~/models/app';
import { getDataWithFetch, sampleOne } from '~/utils/main';
// import { DataDebugger } from '~/components';

// ! 🔥 DO NOT FORGET TO FLIP TO *TRUE* BEFORE PUSHING TO PROD !! 🔥
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

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}
interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

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
          <MaxWidthContainer>
            <Box>
              <VideoPlayer
                video={currentVideo || null}
                autoplay={AUTOPLAY_VIDEO}
              />
            </Box>
          </MaxWidthContainer>
          <MaxWidthContainer>
            <Flex paddingBlock={5} alignItems="center" gap={4}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
              >
                {channel.title}
              </Heading>
              <Button
                // TODO fix this later
                // @ts-ignore
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
                size="lg"
              >
                Chat
              </Button>
              {/* Chat */}
              <Chat
                channelTitle={channel.title}
                messages={messages}
                message={messageBody}
                isOpen={isOpen}
                onClose={onClose}
                onChange={e => setMessageBody(e.target.value)}
                onSubmit={handleMessage}
              />
            </Flex>
            <Text>{channel.about}</Text>
            <Heading paddingBlock={4}>Videos</Heading>
            <SimpleGrid columns={4} columnGap={2.5} rowGap={8} w="full">
              {videos?.map(video => {
                const { url, height, width } = video.thumbnails.medium;
                return (
                  <Image
                    key={video.videoId}
                    alt={video.title}
                    src={url}
                    height={height}
                    width={width}
                  />
                );
              })}
            </SimpleGrid>
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
  const channelSearchQueryData = sampleChannelSearchQueryData;

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
    fallback: false will cause Next to return a 404 page */
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
    throw new Error('error generating path');
  }

  const slug: string = !Array.isArray(params.slug) ? params.slug : '';

  // ? using static data to simulate a database as explained in pages/index.tsx
  const channelSearchQueryData = sampleChannelSearchQueryData;

  /* 
    grab the current channel for this route by matching the slug on the params 
    object with the subscribed channel sample data entry. 
    
    slug comes from the filename [slug] — square brackets signify a dynamic route.
  */
  const channel = channelSearchQueryData.items.find(item => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === slug;
  });

  if (!channel) throw new Error('channel not found');

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
    is pretty low - I have had to create 5 apps on GCP already! - so have dumped 
    some sample data to data/api.ts as with the channel query. 
  */

  const ENDPOINT = getChannelVideosQueryEndpoint(channel.id.channelId, 12);

  const channelVideosQueryData = USE_ACTUAL_API_VIDEO_DATA
    ? await getDataWithFetch<ChannelVideosQueryData>(ENDPOINT)
    : sampleChannelVideosQueryData;

  const title = channel.snippet.title;
  const about = channel.snippet.description;
  const channelId = channel.snippet.channelId;
  const thumbnail = channel.snippet.thumbnails.default.url;
  const videos: Video[] = [];

  channelVideosQueryData.items.forEach(video => {
    videos.push({
      videoId: video.id.videoId,
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
