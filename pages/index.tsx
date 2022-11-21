import { Flex, GridItem, Heading, Link } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import slugify from 'slugify';
import { Layout } from '~/components';
import { sampleChannelSearchQueryData } from '~/data/api';
import type { Channel } from '~/models/app';

// import { getChannelSearchQueryEndpoint } from '~/helpers/youtube-api.helper';
// import { DataDebugger } from '~/components';

type Props = {
  channels: Channel[];
};

function Home({ channels }: Props) {
  return (
    <>
      {/* <DataDebugger data={channelData} /> */}
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
  // const ENDPOINT = getChannelSearchQueryEndpoint(12, 'gaming', 'channel');
  // const channelSearchQueryRes = await fetch(`${ENDPOINT}`);
  // const channelSearchQueryData: ChannelSearchQueryData =
  //   await channelSearchQueryRes.json();

  /* 
    getChannelSearchQueryEndpoint provides an endpoint to fetch channels from
    the YouTube API based on a search query, which means data could be different 
    between queries. As far as I can tell there is no obvious way to query for 
    a consistent list of channels.

    https://developers.google.com/youtube/v3/docs/search

    With a real app there would be a user object persisted to a database which
    would have an array of channels that the authenticated user has subscribed 
    to. This would be fetched from the database via GetStaticProps or 
    getServerSideProps.

    I have queried the YouTube API once using getChannelSearchQueryEndpoint and 
    have dumped the result in data/api.ts to simulate a database fetch, which 
    can be reused in other routes. 

    Something to consider is that we want to persist the sidebar containing 
    the channels the user has subscribed to in between page navigations for an 
    "app-like" feel. This can be achieved by client-side data fetching, like a 
    traditional React SPA.

    At the moment the sidebar is duplicated in the Home and Channel routes since 
    the simulated database channel data is coming from the backend of each route.

    In the future we want to re-architect the app to take advantage of persistent
    layouts. Note if a user followed a channel we'd have to save it to local 
    state for our navigation and also submit to the database - ! potential bugs
    or race conditions.

    TODO implement persistent layout of sidebar & header
    https://nextjs.org/docs/basic-features/layouts#data-fetchinghttps://nextjs.org/docs/basic-features/layouts#data-fetching
    https://www.youtube.com/watch?v=WOeLxL2DF3E&t=37s
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
    https://nextjs.org/docs/api-routes/introduction
    https://swr.vercel.app/docs/with-nextjs

    Next has a solution to this problem with their new (Remix inspired) router 
    that uses an app directory, but the feature is still in beta unfortunately.
    This ties in to React 18 Server Components and streaming.
  */
  const channelSearchQueryData = sampleChannelSearchQueryData;

  const channels: Channel[] = [];

  channelSearchQueryData.data.items.forEach(item =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      about: item.snippet.description,
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
