import Link from 'next/link';
import Head from 'next/head';
import slugify from 'slugify';
import { Container, Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import type { ChannelList } from '~/models/api';
import { channelListSampleData } from '~/data';
import { getSearchEndpoint } from '~/helpers/youtube-api.helper';

type Props = {
  channels: ChannelList[];
};

function Home({ channels }: Props) {
  return (
    <>
      <Head>
        <title>Stitch</title>
        <meta name="description" content="The next big thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading
        lineHeight={1.1}
        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
      >
        This is the Home route
      </Heading>

      {/* <pre>{JSON.stringify(channels, null, 2)}</pre> */}

      <Container maxW="container.xl" pt={10}>
        {channels.map(channel => (
          <p key={channel.channelId}>
            <Link href={`/${slugify(channel.title).toLowerCase()}`}>
              {channel.title}
            </Link>
          </p>
        ))}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // fetch list of channels from YouTube API based on search query

  // const ENDPOINT = getSearchEndpoint(25, 'gaming', 'channel');
  // const res = await fetch(`${ENDPOINT}`);
  // const channelData = await res.json();
  // ! Went over the API req quota so span up a new app on GCP & sampling data!
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

  /* 
      getStaticProps will:

        1. fetch data from API
        2. create static pages at build time

      the revalidate property is the only thing required to transition from 
      SSG to ISR. ISR behaves like SSG, but re-fetches data and rebuilds 
      static pages on the server once every interval specified in seconds. 
      The stale static pages are invalidated by the server. Example usage:

      return {
        props: {
          channels: data.items,
        },
        revalidate: 5,
          };
      };

      to transition to SSR from ISR, we just rename getStaticProps to 
      getServerSideProps (+ change the type) and delete getStaticPaths. 
      SSR will fetch data and serve fresh pages on every user request.
  */
};

export default Home;
