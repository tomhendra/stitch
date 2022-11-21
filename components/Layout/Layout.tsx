import { Grid, GridItem } from '@chakra-ui/react';
import type { Children } from '~/types';

import { Navbar } from '../Navbar';

function Layout({ children }: Children) {
  return (
    <Grid
      templateColumns={'15rem 1fr'}
      gridTemplateRows={'3rem 1fr'}
      gap={2}
      minH="100%"
      templateAreas={`
    "header header"
    "sidebar main"
    `}
    >
      <GridItem p={2} shadow="base" area={'header'}>
        <Navbar />
      </GridItem>
      {children}
    </Grid>
  );
}

export { Layout };
