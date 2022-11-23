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
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <GridItem area={'Sidebar'} bg={bgColor} py={4} zIndex={3}>
      <VStack alignItems="start">
        <Heading
          as="h2"
          fontSize="xl"
          marginBlockEnd={3}
          display={['none', 'none', 'revert']}
          px={2.5}
        >
          For You
        </Heading>
        <Heading
          as="h3"
          className="uppercase"
          fontSize="sm"
          color={'gray.500'}
          display={['none', 'none', 'revert']}
          px={2.5}
        >
          Followed channels
        </Heading>
        <Flex as="nav">
          <VStack w="full" h="full" p={0} spacing={1.5} alignItems="flex-start">
            {channels?.map(channel => (
              <NextLink
                key={channel.channelId}
                href={`/${slugify(channel.title).toLowerCase()}`}
                legacyBehavior
                passHref
              >
                <Link
                  noOfLines={1}
                  variant="button"
                  w="full"
                  px={[2, 2.5]}
                  cursor="pointer"
                  _hover={{ bg: hoverColor }}
                >
                  <Flex alignItems={'center'} gap={2} paddingBlock={2}>
                    <Box>
                      <Image
                        className="circular"
                        src={channel.thumbnail}
                        alt={`avatar for ${channel.title}`}
                        height={30}
                        width={30}
                      />
                    </Box>
                    <Heading
                      as="p"
                      fontSize="1xl"
                      display={['none', 'none', 'revert']}
                    >
                      {channel.title}
                    </Heading>
                  </Flex>
                </Link>
              </NextLink>
            ))}
          </VStack>
        </Flex>
      </VStack>
    </GridItem>
  );
}

export { Sidebar };
