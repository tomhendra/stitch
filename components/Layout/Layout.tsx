import { Grid, GridItem } from '@chakra-ui/react';
import type { Children } from '~/types';

import { Navbar } from '../Navbar';

function Layout({ children }: Children) {
  return (
    <Grid
      templateColumns={'15rem 1fr'}
      gridTemplateRows={'3rem 1fr'}
      minH="100%"
      templateAreas={`
      "header header"
      "sidebar main"
      `}
      gap={2}
    >
      {children}
    </Grid>
  );
}

export { Layout };
