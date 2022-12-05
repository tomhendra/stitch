import { Box, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { Layout, Main, MaxWidthContainer, Navbar, Sidebar } from '~/components';
import { sampleChannelsSearchData } from '~/data/api';
import { getYouTubeChannelsEndpoint } from '~/helpers/youtube-api.helper';
import { getDataWithFetch } from '~/utils';

import type { GetStaticProps } from 'next';
import type { ChannelSearchQueryData } from '~/models/api';
import type { Channel } from '~/models/app';

// import { DataDebugger } from '~/components';

// !! 🔥 FLIP TO *FALSE* BEFORE PUSHING TO PROD !! 🔥
const USE_ACTUAL_API_CHANNEL_DATA = false;

/* 
    TODO improve User Experience 
    Core Web Vitals https://web.dev/vitals/
    TODO consider whether url/channels/user would be better for SEO
    https://nextjs.org/learn/seo/rendering-and-ranking/url-structure
    TODO generate OG images from channel thumbnail
    TODO go further with Open Graph 
    https://ogp.me/
    TODO generate structured data and JSON-LD 
    https://schema.org/docs/documents.html
    TODO Learn more about how rendering strategies affect SEO
    https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/
    https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation
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

      {/* <DataDebugger data={channels} /> */}

      <Layout>
        <Navbar />
        <Sidebar channels={channels} />
        <Main>
          <MaxWidthContainer>
            <Box px={[2, 4, 6, 10]} py={[4, 6, 10]}>
              <Heading as="h1">Welcome to Stitch!</Heading>
              <Text as="p">The next big thing in video streaming.</Text>
            </Box>
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
*/

export const getStaticProps: GetStaticProps<Props> = async () => {
  const endpoint = getYouTubeChannelsEndpoint({
    maxResults: 8,
    order: 'date',
    q: 'gaming',
  });

  const channelSearchQueryData = USE_ACTUAL_API_CHANNEL_DATA
    ? await getDataWithFetch<ChannelSearchQueryData>(endpoint)
    : sampleChannelsSearchData;

  if (!channelSearchQueryData.items) {
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

  channelSearchQueryData.items.forEach(item => {
    const { channelId, title, description, thumbnails } = item.snippet;

    channels.push({
      channelId: channelId,
      title: title,
      about: description,
      thumbnail: thumbnails.default.url || '/images/user-circle.png',
    });
  });

  return {
    props: {
      channels,
    },
    revalidate: 5,
  };
};

export default Home;
