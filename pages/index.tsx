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

/* 
    TODO improve User Experience 
    - Error handling throughout app for a better user experience
    - Core Web Vitals https://web.dev/vitals/ 

    TODO consider whether url/channels/user would be better for SEO
    https://nextjs.org/learn/seo/rendering-and-ranking/url-structure

    SEO 
    TODO generate OG images from channel thumbnail
    TODO go further with Open Graph https://ogp.me/
    TODO generate structured data and JSON-LD https://schema.org/docs/documents.html
*/

type Props = {
  channels: Channel[];
};

function Home({ channels }: Props) {
  return (
    <>
      <Head>
        <title>Stitch</title>
        <meta
          name="description"
          content="A big thing in video streaming"
          key="desc"
        />
        <meta name="robots" content="all" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Stitch" />
        <meta property="og:description" content="Get social with Stitch" />
        <meta property="og:image" content="https://postimg.cc/w3Vk5FJ0" />
      </Head>

      {/* <DataDebugger data={channelData} /> */}

      <Layout>
        <GridItem p={2} area={'sidebar'}>
          <Heading as="p" fontSize="xl" marginBlockEnd={3}>
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
          <Heading as="h1">Home route</Heading>
        </GridItem>
      </Layout>
    </>
  );
}

/*  
  for SSG getStaticProps will:

    1. fetch data from API
    2. create static pages at build time

  the revalidate property is the only addition required to transition from SSG 
  to ISR. ISR behaves like SSG, but re-fetches data and rebuilds static pages on 
  the server (if there is a client request for them) no more than once during 
  a specified period of time in seconds. The stale static pages are invalidated 
  by the server and new ones are served. Example usage:
  ...
  return {
    props: {
      channels,
    },
    revalidate: 5,
  };

  ...
  to transition to SSR from ISR, we just rename getStaticProps to 
  getServerSideProps (+ change the type) and delete getStaticPaths. SSR will 
  fetch data and serve fresh pages on every user request.

  ? Learn more about how rendering strategies affect SEO
  https://nextjs.org/learn/seo/rendering-and-ranking/rendering-strategies
  https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/
  https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation
*/
export const getStaticProps: GetStaticProps<Props> = async () => {
  // const ENDPOINT = getChannelSearchQueryEndpoint(12, 'gaming', 'channel');
  // const channelSearchQueryRes = await fetch(`${ENDPOINT}`);
  // const channelSearchQueryData: ChannelSearchQueryData =
  // await channelSearchQueryRes.json();

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
    the channel data is dynamically generated from the backend of each route 
    via a (simulated) database read.

    In the future we may want to re-architect the app to take advantage of 
    persistent layouts, which presently requires Client-Side Rendering in 
    Next.js. Note if a user added a channel to their followed channels list, 
    we'd have to update local state for our navigation + update the database, 
    which could introduce bugs due to race conditions - handle with care.
    
    There is a tradeoff with this approach however - in general Client-Side 
    Rendering is not recommended for optimal SEO. CSR is perfect for data heavy 
    dashboards, account pages or any page that you do not require to be in any 
    search engine index.

    Next.js 13 has a new (Remix inspired) router which handles nested layouts, 
    but the app directory part of the feature to invoke this behaviour is still 
    in beta. This ties in to React 18 Server Components and Streaming.
    TODO investigate SEO strategies for the upcoming router architecture
    https://nextjs.org/blog/next-13

    TODO (maybe) implement persistent layout of sidebar & header the stable way
    https://nextjs.org/docs/basic-features/layouts#data-fetchinghttps://nextjs.org/docs/basic-features/layouts#data-fetching
    https://www.youtube.com/watch?v=WOeLxL2DF3E&t=37s
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
    https://nextjs.org/docs/api-routes/introduction
    https://swr.vercel.app/docs/with-nextjs
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
