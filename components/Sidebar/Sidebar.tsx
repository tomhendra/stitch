import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import slugify from 'slugify';
import type { Channel } from '~/models/app';
import Image from 'next/image';

type Props = {
  channels: Channel[];
};

function Sidebar({ channels }: Props) {
  return (
    <>
      <Heading as="h2" fontSize="xl" marginBlockEnd={3}>
        For you
      </Heading>
      <Heading
        as="h3"
        className="uppercase"
        fontSize="md"
        color={'gray.500'}
        paddingBlockEnd={4}
      >
        Followed channels
      </Heading>
      <Flex as="nav" direction="column" gap={1.5}>
        {channels?.map(channel => (
          <Flex
            key={channel.channelId}
            alignItems={'center'}
            gap={2}
            paddingBlock={2}
          >
            <Image
              className="circular"
              src={channel.thumbnail}
              alt={`avatar for ${channel.title}`}
              height={30}
              width={30}
            />
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
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export { Sidebar };
