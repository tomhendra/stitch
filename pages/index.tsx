import { GridItem, Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout, Navbar, Sidebar } from '~/components';
import { sampleChannelSearchQueryData } from '~/data/api';
import type { Channel } from '~/models/app';

// import { getDataWithFetch } from '~/utils/main';
// import { getChannelSearchQueryEndpoint } from '~/helpers/youtube-api.helper';
// import type { ChannelSearchQueryData } from '~/models/api';

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

      {/* <DataDebugger data={channelSearchQueryData} /> */}

      <Layout>
        <GridItem p={2} shadow="base" area={'header'}>
          <Navbar />
        </GridItem>
        <GridItem p={2} area={'sidebar'}>
          <Sidebar channels={channels} />
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
  // const channelSearchQueryData = await getDataWithFetch<ChannelSearchQueryData>(
  //   ENDPOINT,
  // );

  const channelSearchQueryData = sampleChannelSearchQueryData;

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

    If we were fetching real channel data from each route, the sidebar & header 
    components in the Home and Channel routes would unmount and remount on page 
    navigation change. If we wanted to persist state between page navigations, 
    with Next.js we need to use client-side data fetching - the same as a React 
    SPA.
    
    There is a tradeoff with this approach however - in general Client-Side 
    Rendering is not recommended for optimal SEO. CSR is more suited to data 
    heavy dashboards, account pages or any page that you do not require to be 
    in any search engine index.

    I am still developing my mental model of Next.js - which is why there are a 
    lot of note changes! 
    TODO read Next.js docs from start to finish

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

  const channels: Channel[] = [];

  channelSearchQueryData.items.forEach(item =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      about: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
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
