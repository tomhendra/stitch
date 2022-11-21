import NextLink from 'next/link';
import Head from 'next/head';
import slugify from 'slugify';
import {
  Container,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Link,
} from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import type { ChannelList } from '~/models/api';
import { channelListSampleData } from '~/data';
import { getSearchEndpoint } from '~/helpers/youtube-api.helper';
import Image from 'next/image';
import { Layout } from '~/components';

type Props = {
  channels: ChannelList[];
};

function Home({ channels }: Props) {
  return (
    <>
      {/* <pre>{JSON.stringify(channels, null, 2)}</pre> */}

      <Head>
        <title>Stitch</title>
        <meta name="description" content="The next big thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* sidebar depends on data props so is duplicated in Home and 
          Channel routes. see comments in _app.tsx for more info */}
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
  // fetch list of channels from YouTube API based on search query

  // const ENDPOINT = getSearchEndpoint(12, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const channelData = await res.json();
  const channelData = channelListSampleData;

  const channels: ChannelList[] = [];

  channelData.items.forEach((item: any) =>
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
