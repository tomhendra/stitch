import Head from 'next/head';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react';

function Home() {
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
    </>
  );
}

export default Home;
