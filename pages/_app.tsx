import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import theme from '~/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  // the pageProps object represents the props for each page
  // when data is fetched pageProps is populated
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
