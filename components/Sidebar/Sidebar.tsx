import NextLink from 'next/link';
import slugify from 'slugify';
import Image from 'next/image';
import type { Channel } from '~/models/app';
import { Heading, Flex, Link } from '@chakra-ui/react';

type Props = {
  channels: Channel[];
};

function Sidebar({ channels }: Props) {
  return (
    <>
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
    </>
  );
}

export { Sidebar };
