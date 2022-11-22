import { GridItem, useColorModeValue } from '@chakra-ui/react';
import type { Children } from '~/types';

function Main({ children }: Children) {
  const bgColor = useColorModeValue('white', 'black');

  return (
    <GridItem
      as="main"
      area={'Main'}
      zIndex={1}
      bg={bgColor}
      h="full"
      w="full"
      paddingBlockEnd={16}
    >
      {children}
    </GridItem>
  );
}

export { Main };
