import { Container } from '@chakra-ui/react';
import type { Children } from '~/types';

function MaxWidthContainer({ children }: Children) {
  return (
    <Container maxW="2000px" padding={10}>
      {children}
    </Container>
  );
}

export { MaxWidthContainer };
