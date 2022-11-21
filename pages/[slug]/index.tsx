import {
  AspectRatio,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  GridItem,
  Heading,
  Input,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRef } from 'react';
import slugify from 'slugify';
import { Layout } from '~/components';
import {
  channelListSampleData,
  messageSampleData,
  videosSampleData,
} from '~/data/api';
import { getVideosFromChannel } from '~/helpers/youtube-api.helper';
import type { ParsedUrlQuery } from 'querystring';

import type { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import type { ChannelListDataFromApi, VideoDataFromApi } from '~/models/api';
import type { Channel, ChannelList, Message, Video } from '~/models/app';
import { sampleOne } from '~/utils/main';
// import { DataDebugger } from '~/components';

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}
interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  channel: Channel;
  channels: ChannelList[];
};

function Channel({ channel, channels }: Props) {
  // Videos
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // On component mount populate video state variables
  useEffect(() => {
    setVideos(channel.videos);
    setCurrentVideo(sampleOne(channel.videos));
  }, [channel.videos]);

  /* 
    Handle the message and persist in component state. The messages are currently
    not associated with a channel, so remain the same across channel routes. 
    
    Take this as a minimum proof of concept that the form handling works..

    TODO create an auth flow and realtime chat via Websockets & PostgreSQL
    - channel id for each message & database query with id to get messages for 
    current channel.
  
  */
  function handleMessage(event: React.FormEvent<MessageFormElement>) {
    event.preventDefault();

    const newMessage = {
      sender: 'Me',
      body: event.currentTarget.elements.messageInput.value,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const randomMessage = sampleOne(messageSampleData.items);

    setTimeout(() => {
      setMessages([...updatedMessages, randomMessage]);
    }, 1000);
  }

  return (
    <>
      {/* <DataDebugger data={channel} />  */}
      {/* <DataDebugger data={channels} />  */}
      <Head>
        <title>User channel</title>
        <meta name="description" content="User description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* sidebar depends on data props so is duplicated in Home and 
          Channel routes. see comments in index.tsx for more info */}
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
          <AspectRatio maxW="560px" ratio={16 / 9} paddingBlock={6}>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo?.videoId}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </AspectRatio>
          <Flex paddingBlock={5} alignItems="center" gap={4}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            >
              {channel.title}
            </Heading>
            {/* @ts-ignore */}
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen} size="lg">
              Chat
            </Button>
          </Flex>
          <p>{channel.about}</p>
          <div>
            {/* Channel video list */}
            <Heading paddingBlock={4}>Videos</Heading>
            <List>
              {videos?.map(video => (
                <ListItem key={video.videoId}>{video.title}</ListItem>
              ))}
            </List>
          </div>
          {/* Chat */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Chat</DrawerHeader>
              <DrawerBody>
                <Flex direction="column" maxHeight="100%">
                  <Box p="4">
                    {messages?.map(message => (
                      <div key={message.body}>
                        <Text fontSize="xs">From: {message.sender}</Text>
                        <Text marginBottom={6}>{message.body}</Text>
                      </div>
                    ))}
                  </Box>
                  <Spacer />
                </Flex>
              </DrawerBody>
              <DrawerFooter>
                <Flex
                  // @ts-ignore
                  onSubmit={handleMessage}
                  as="form"
                  direction="column"
                  width="100%"
                  gap="6"
                >
                  <Input id="messageInput" placeholder="Message..." />
                  <Flex direction="column" width="100%" gap="3">
                    <Button type="submit">Send</Button>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </GridItem>
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
  // const ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const data = await res.json();
  // ? using static data for this API call - see explanation in pages/index.tsx
  const data = channelListSampleData;

  // TODO how to type getStaticPaths? (Next docs doesn't advise!) remove last "any"
  // https://www.vitamindev.com/next-js/getstaticprops-getstaticpaths-typescript/

  const paths: any = [];

  data.items.forEach(item => {
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

  // ? using static data for this API call - see explanation in pages/index.tsx
  // const SEARCH_ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const searchRes = await fetch(`${SEARCH_ENDPOINT}`);
  // const searchData = await searchRes.json();
  const searchData = channelListSampleData;

  /* 
    grab the current channel for ths dynamic route by matching the slug on the
    params object with the subscribed channel data. 
    
    slug comes from the filename [slug] — square brackets signify a dynamic route.
  */
  const channel = searchData.items.find((item: ChannelListDataFromApi) => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === slug;
  });

  const channels: ChannelList[] = [];

  /* 
    populate the channels array so that we only send data from the server that 
    is required to minimise bandwidth and compute expense.
  */
  searchData.items.forEach((item: ChannelListDataFromApi) =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
    }),
  );

  // Call a *real* API this time 😅
  // const VIDEOS_ENDPOINT = channel
  //   ? getVideosFromChannel(channel.id.channelId, 12)
  //   : '';
  // const videosRes = await fetch(`${VIDEOS_ENDPOINT}`);
  // const videosData = await videosRes.json();
  // ? swap to sample data if the API quota runs low (or spin up another app on GCP!)
  const videosData = videosSampleData;

  const title: string = channel?.snippet.title || '';
  const about: string = channel?.snippet.description || '';
  const channelId: string = channel?.snippet.channelId || '';
  const videos: Video[] = [];

  videosData.items.forEach((video: VideoDataFromApi) => {
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
