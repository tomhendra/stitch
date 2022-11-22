import { Flex, VisuallyHidden } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import type { Channel } from '~/models/app';

type Props = {
  channel?: Channel;
};

function Navbar({ channel }: Props) {
  return (
    <Flex
      as="header"
      alignItems="center"
      gap={3}
      justifyContent={'space-between'}
    >
      <NextLink href="/">
        <Image
          alt="Stitch logo - credit of Vercel"
          src="/images/stitch-dark.svg"
          height={24}
          width={24}
        />
        <VisuallyHidden>Switch - Home navigation</VisuallyHidden>
      </NextLink>
      <Image
        alt={`avatar for ${channel?.title}`}
        className="circular"
        src={channel?.thumbnail || '/images/user-circle.png'}
        height={30}
        width={30}
      />
    </Flex>
  );
}

export { Navbar };
