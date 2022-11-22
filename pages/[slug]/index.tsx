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
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import type { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import { Layout } from '~/components';
import {
  sampleMessageData,
  sampleChannelSearchQueryData,
  sampleChannelVideosQueryData,
} from '~/data/api';
import { getChannelVideosQueryEndpoint } from '~/helpers/youtube-api.helper';
import type { ChannelVideosQueryData } from '~/models/api';
import type { Channel, Message, Video } from '~/models/app';
import { sampleOne } from '~/utils/main';

// import { DataDebugger } from '~/components';

/* 
    SEO
    TODO consider https://<url>/channels/user url structure
    https://nextjs.org/learn/seo/rendering-and-ranking/url-structure
    TODO generate OG images from channel thumbnail
    TODO go further with Open Graph https://ogp.me/
    TODO generate structured data and JSON-LD https://schema.org/docs/documents.html
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
  const [message, setMessage] = useState('');
  // Drawer
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

    TODO create an auth flow and realtime chat via Websockets & PostgreSQL
    - channel id for each message & database query with id to get messages for 
    current channel.
  
  */
  function handleMessage(event: React.FormEvent<MessageFormElement>) {
    event.preventDefault();

    const newMessage = {
      sender: 'Me',
      body: message,
    };

    const updatedMessages = [...messages, newMessage];
    setMessage('');
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

      {/* <DataDebugger data={channel} />  */}
      {/* <DataDebugger data={channelVideosQueryData} /> */}

      <Layout>
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
            {/* // TODO fix when more familiar with Chakra */}
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
                  onSubmit={() => handleMessage}
                  as="form"
                  direction="column"
                  width="100%"
                  gap="6"
                >
                  <Input
                    id="messageInput"
                    placeholder="Message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
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
  // ? using static data to simulate a database as explained in pages/index.tsx
  const channelSearchQueryData = sampleChannelSearchQueryData;

  // TODO how to type getStaticPaths? - no info in Next docs! - remove "any"
  // https://www.vitamindev.com/next-js/getstaticprops-getstaticpaths-typescript/
  const paths: any = [];

  channelSearchQueryData.data.items.forEach(item => {
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

  // ? using static data to simulate a database as explained in pages/index.tsx
  const channelSearchQueryData = sampleChannelSearchQueryData;

  /* 
    grab the current channel for this route by matching the slug on the params 
    object with the subscribed channel sample data entry. 
    
    slug comes from the filename [slug] — square brackets signify a dynamic route.
  */
  const channel = channelSearchQueryData.data.items.find(item => {
    const { title } = item.snippet;
    const itemSlug = slugify(title).toLowerCase();
    return itemSlug === slug;
  });

  const channels: Channel[] = [];
  /* 
    populate the channels array so that we only send data from the server that 
    is required to minimise bandwidth and compute expense.
  */
  channelSearchQueryData.data.items.forEach(item =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      about: item.snippet.description,
    }),
  );

  if (!channel) {
    throw new Error('channel not found');
    // TODO research how Next handles errors.
  }

  /* 
    Now we hit the YouTube API to get videos for the channel 🎉. The GCP quota 
    is pretty low - I have had to create 3 apps on GCP already! - so have dumped 
    some sample data to data/api.ts as with the channel query. 
  */
  // TODO move fetch calls into helpers and return proper types
  const ENDPOINT = getChannelVideosQueryEndpoint(channel.id.channelId, 12);
  const channelVideosQueryRes = await fetch(`${ENDPOINT}`);
  const channelVideosQueryData: ChannelVideosQueryData =
    await channelVideosQueryRes.json();

  // const channelVideosQueryData = sampleChannelVideosQueryData;

  const title = channel?.snippet.title || '';
  const about = channel?.snippet.description || '';
  const channelId = channel?.snippet.channelId || '';
  const videos: Video[] = [];

  channelVideosQueryData.items.forEach(video => {
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
