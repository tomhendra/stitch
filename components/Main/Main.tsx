import { GridItem, useColorModeValue } from '@chakra-ui/react';
import type { Children } from '~/types';

function Main({ children }: Children) {
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.100');

  return (
    <GridItem as="main" area={'Main'} px={8} zIndex={1} bg={bgColor}>
      {children}
    </GridItem>
  );
}

export { Main };