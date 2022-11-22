import { Grid } from '@chakra-ui/react';
import type { Children } from '~/types';

function Layout({ children }: Children) {
  return (
    <Grid
      templateColumns={['3rem 1fr', '3rem 1fr', '15rem 1fr']}
      gridTemplateRows={['3rem 1fr']}
      minH="100%"
      templateAreas={`
      "Navbar Navbar"
      "Sidebar Main"
      `}
    >
      {children}
    </Grid>
  );
}

export { Layout };
