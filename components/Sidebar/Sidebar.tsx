import NextLink from 'next/link';
import slugify from 'slugify';
import Image from 'next/image';
import type { ChannelList } from '~/models/app';
import { useRouter } from 'next/router';
import {
  Container,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  channelData: ChannelList[] | null;
};

function Sidebar({ channelData }: Props) {
  // TODO reusable components in Next.js ?

  /* 
    In a React app passing props as children and storing in state is standard 
    behaviour. Next.js has a lot of opinions which needs more reading of docs 
    or tweets @leeerob to grok.
  */

  const [channels, setChannels] = useState<ChannelList[] | null>(null);
  useEffect(() => setChannels(channelData), []);

  return (
    <Container maxW="container.xl" p={0}>
      <Heading fontSize="1xl" marginBlockEnd={3}>
        For you
      </Heading>
      <Flex direction="column" gap={1.5}>
        {channels?.map(channel => (
          <NextLink
            key={channel.channelId}
            href={`/${slugify(channel.title).toLowerCase()}`}
          >
            <Link noOfLines={1}>{channel.title}</Link>
          </NextLink>
        ))}
      </Flex>
    </Container>
  );
}
export { Sidebar };
