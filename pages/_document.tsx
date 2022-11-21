import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import theme from '~/styles/theme';

/*
  Overriding the document allows us to add custom favicon, 
  html properties,3rd party scripts for analytics scripts, etc.
*/

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
      </body>
      <NextScript />
    </Html>
  );
}
