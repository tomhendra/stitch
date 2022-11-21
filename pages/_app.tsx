import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '~/styles/theme';
import '../styles/globals.css';
import { Children } from '~/types';

// App is the *only* component that renders on every page.
// the pageProps object represents the props for each page.
// when data is fetched, pageProps is populated.

/* 
  to persist elements between routes for an app-like feel, we need to use nested 
  layouts, which is not super intuitive in Next.js and has some limitations.

  https://www.youtube.com/watch?v=WOeLxL2DF3E&t=37s

  this has been solved with nested routing (credit to Remix) once app dir is 
  out of beta we will be able to use this feature for an app-like feel 🎉. 
  
  https://nextjs.org/docs/advanced-features/custom-app
  
  our app makes use of API calls using functions called on the server rather 
  than fetching data from the client - we could either refactor to fetch data
  from the client, but SPA-like behaviour could impact SEO (?). 
  On the server we can also control hits to the api / database, which if 
  executed on the client would be lost.

  TODO play more and test. Next.js offers a lot of flexibility.
*/

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
    <ChakraProvider theme={theme}>
      {Component.PageLayout ? (
        <InnerLayout>
          <Component {...pageProps} />)
        </InnerLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  );
}
