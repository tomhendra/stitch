import { Flex, GridItem, Heading, Link } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import slugify from 'slugify';
import { Layout } from '~/components';
import { channelListSampleData } from '~/data/api';
import { ChannelListDataFromApi } from '~/models/api';
import type { ChannelList } from '~/models/app';

// import { getSearchEndpoint } from '~/helpers/youtube-api.helper';
// import { DataDebugger } from '~/components';

type Props = {
  channels: ChannelList[];
};

function Home({ channels }: Props) {
  return (
    <>
      {/* <DataDebugger data={channels} /> */}
      <Head>
        <title>Stitch</title>
        <meta name="description" content="The next big thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* sidebar depends on data props so is duplicated in Home and 
          Channel routes. see comments below */}
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
          <Heading>Home route</Heading>
        </GridItem>
      </Layout>
    </>
  );
}

/*
  ? Some notes on data fetching and rendering methods
  
  getStaticProps will:

    1. fetch data from API
    2. create static pages at build time

  the revalidate property is the only thing required to transition from 
  SSG to ISR. ISR behaves like SSG, but re-fetches data and rebuilds 
  static pages on the server once every interval specified in seconds. 
  The stale static pages are invalidated by the server. Example usage:
  ...
  return {
    props: {
      channels,
    },
    revalidate: 5,
  };
  ...
  to transition to SSR from ISR, we just rename getStaticProps to 
  getServerSideProps (+ change the type) and delete getStaticPaths. 
  SSR will fetch data and serve fresh pages on every user request.
  
*/
export const getStaticProps: GetStaticProps<Props> = async () => {
  // const ENDPOINT = getSearchEndpoint(12, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const channelData = await res.json();

  /* 
    getSearchEndpoint fetches a list of channels from YouTube API based on 
    a YouTube search query. As far as I can tell there is no obvious way to 
    query a consistent list of channels from the YouTube API without using this 
    feature.

    https://developers.google.com/youtube/v3/docs/search

    With a real app there would be a user object persisted to a database which
    would have an array of channels that the authenticated user has subscribed 
    to. This would be fetched from the database and used to query our API for 
    channel data.

    We want to persist the sidebar containing the channels between page nav. 
    This can be handled by client-side data fetching, like a traditional React 
    SPA. At the moment the sidebar + server-side data fetching is duplicated in 
    Home & Channel routes. 
    
    The problem with this is that the Google algorithm will generate a fresh 
    response each time the API is called, which could result in different data
    on different routes! 🪲 

    For now, rather than query YouTube to simulate a database we can "get" data 
    for subscribed channels from /data.ts on the backend ¯\_(ツ)_/¯ 

    TODO implement nested Layouts
    - Persist header and sidebar data to React context (global state) at the top level _app.tsx
    https://nextjs.org/docs/basic-features/layouts#data-fetchinghttps://nextjs.org/docs/basic-features/layouts#data-fetching
    https://www.youtube.com/watch?v=WOeLxL2DF3E&t=37s
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/

    TODO move data fetching for navigation to client-side with SWR + API route
    https://nextjs.org/docs/api-routes/introduction
    https://swr.vercel.app/docs/with-nextjs
  */
  const channelData = channelListSampleData;

  const channels: ChannelList[] = [];

  channelData.items.forEach((item: ChannelListDataFromApi) =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
    }),
  );

  return {
    props: {
      channels,
    },
    revalidate: 5,
  };
};

export default Home;
