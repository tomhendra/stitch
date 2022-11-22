import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from '~/styles/theme';
import { Children } from '~/types';
import '../styles/globals.css';
import { ErrorBoundary } from '~/components';

// App is the *only* component that renders on every page.
// the pageProps object represents the props for each page.
// when data is fetched, pageProps is populated.

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  // avoid context errors: https://stackoverflow.com/a/74292554/9734605
  const InnerLayout =
    Component.PageLayout || (({ children }: Children) => children);

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        {Component.PageLayout ? (
          <InnerLayout>
            <Component {...pageProps} />)
          </InnerLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export function reportWebVitals(metric: any) {
  console.log(metric);
}
