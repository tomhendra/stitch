import { Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout, Main, MaxWidthContainer, Navbar, Sidebar } from '~/components';
import { sampleChannelSearchQueryData } from '~/data/api';
import { getChannelSearchQueryEndpoint } from '~/helpers/youtube-api.helper';
import type { ChannelSearchQueryData } from '~/models/api';
import type { Channel } from '~/models/app';
import { getDataWithFetch } from '~/utils/main';
// import { DataDebugger } from '~/components';

// ! 🔥 FLIP TO *FALSE* BEFORE PUSHING TO PROD !! 🔥
const USE_ACTUAL_API_CHANNEL_DATA = false;

/* 
    TODO improve User Experience 
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
        <Navbar />
        <Sidebar channels={channels} />
        <Main>
          <MaxWidthContainer>
            <Heading as="h1">Home route</Heading>
          </MaxWidthContainer>
        </Main>
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

  TODO Learn more about how rendering strategies affect SEO
  https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/
  https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation
*/

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ENDPOINT = getChannelSearchQueryEndpoint(6, 'gaming', 'channel');
  const channelSearchQueryData = USE_ACTUAL_API_CHANNEL_DATA
    ? await getDataWithFetch<ChannelSearchQueryData>(ENDPOINT)
    : sampleChannelSearchQueryData;

  if (!channelSearchQueryData) {
    /* getDataWithFetch has error handling but leave this here in case 
    the static data fails */
    throw new Error('error fetching channel data');
  }

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
  */

  const channels: Channel[] = [];

  channelSearchQueryData.items.forEach(item =>
    channels.push({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      about: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.default.url || '/images/user-circle.png',
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
