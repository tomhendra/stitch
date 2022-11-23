import { Container } from '@chakra-ui/react';
import type { Children } from '~/types';

function MaxWidthContainer({ children }: Children) {
  return (
    <Container maxW="2000px" p={0}>
      {children}
    </Container>
  );
}

export { MaxWidthContainer };
