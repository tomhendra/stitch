import {
  Button,
  GridItem,
  HStack,
  VisuallyHidden,
  useColorMode,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Logo } from './Logo';
import { Sun } from './Sun';
import { Moon } from './Moon';
import { User } from './User';
import type { Channel } from '~/models/app';

function Navbar() {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('black', 'white');
  // TODO learn Chakra better - this feels a bit hacky
  const logoColor = useColorModeValue(
    'var(--chakra-colors-purple-600)',
    'var(--chakra-colors-purple-500)',
  );

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
          <Logo color={logoColor} />
          <VisuallyHidden>Switch - Home navigation</VisuallyHidden>
        </NextLink>
        <HStack alignItems="center" gap={4}>
          <Button
            color={secondaryTextColor}
            variant="link"
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? (
              <>
                <VisuallyHidden>Dark</VisuallyHidden>
                <Moon color={iconColor} h="24px" w="24px" />
              </>
            ) : (
              <>
                <Sun color={iconColor} h="24px" w="24px" />
                <VisuallyHidden>Light</VisuallyHidden>
              </>
            )}
          </Button>
          <Flex p="3px">
            <User color={iconColor} h="24px" w="24px" />
          </Flex>
        </HStack>
      </HStack>
    </GridItem>
  );
}

export { Navbar };
