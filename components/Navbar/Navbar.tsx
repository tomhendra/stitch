import Image from 'next/image';
import NextLink from 'next/link';

import {
  Container,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Spacer,
  Link,
} from '@chakra-ui/react';

function Navbar() {
  return (
    <Flex as="header" alignItems="center" gap={3}>
      <NextLink href="/">
        <Image
          src="/images/stitch-dark.svg"
          height={24}
          width={24}
          alt="Stitch logo - credit of Vercel"
        />
      </NextLink>
      <Heading as="span" fontSize="2xl">
        Stitch
      </Heading>
    </Flex>
  );
}
export { Navbar };
