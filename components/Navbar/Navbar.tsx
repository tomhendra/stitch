import {
  Button,
  GridItem,
  HStack,
  VisuallyHidden,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import type { Channel } from '~/models/app';

type Props = {
  channel?: Channel;
};

function Navbar({ channel }: Props) {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.100');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <GridItem
      position="sticky"
      top={0}
      area={'Navbar'}
      shadow="base"
      bg={bgColor}
      p={2.5}
      zIndex={4}
    >
      <HStack
        as="header"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <NextLink href="/">
          <Image
            alt="Stitch logo - credit of Vercel"
            src="/images/stitch-dark.svg"
            height={24}
            width={24}
          />
          <VisuallyHidden>Switch - Home navigation</VisuallyHidden>
        </NextLink>
        <HStack alignItems="center" gap={4}>
          <Button
            color={secondaryTextColor}
            variant="link"
            onClick={toggleColorMode}
          >
            Theme
          </Button>
          <Image
            alt={`avatar for ${channel?.title}`}
            className="circular"
            src={channel?.thumbnail || '/images/user-circle.png'}
            height={30}
            width={30}
          />
        </HStack>
      </HStack>
    </GridItem>
  );
}

export { Navbar };
