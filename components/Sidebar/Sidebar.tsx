import {
  Box,
  Flex,
  GridItem,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import slugify from 'slugify';
import type { Channel } from '~/models/app';
import Image from 'next/image';

type Props = {
  channels: Channel[];
};

function Sidebar({ channels }: Props) {
  const bgColor = useColorModeValue('gray.100', 'whiteAlpha.50');

  return (
    <GridItem area={'Sidebar'} bg={bgColor} px={2.5} py={4} zIndex={3}>
      <Heading as="h2" fontSize="xl" marginBlockEnd={3}>
        For You
      </Heading>
      <Heading
        as="h3"
        className="uppercase"
        fontSize="sm"
        color={'gray.500'}
        paddingBlockEnd={4}
      >
        Followed channels
      </Heading>
      <Flex as="nav">
        <VStack w="full" h="full" p={0} spacing={1.5} alignItems="flex-start">
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
        </VStack>
      </Flex>
    </GridItem>
  );
}

export { Sidebar };
