import { GridItem } from '@chakra-ui/react';
import type { Children } from '~/types';

function Main({ children }: Children) {
  return (
    <GridItem as="main" area={'main'} px={8} zIndex={1}>
      {children}
    </GridItem>
  );
}

export { Main };
