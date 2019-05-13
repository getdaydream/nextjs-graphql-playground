/**
 * Next.js uses the App component to initialize pages.
 * You can override it and control the page initialization.
 * You can Inject additional data into pages (for example by processing GraphQL queries)
 * https://nextjs.org/docs/#custom-app
 */

import React from 'react';
import App, { Container, NextAppContext, AppProps } from 'next/app';
import GlobalStyle from '@/containers/GlobalStyle';
import { ApolloClient } from 'apollo-client';
import { NormalizedCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { withApolloClient, grommetTheme } from '@/utils';
import { ApolloProvider, compose } from 'react-apollo';
import { Grommet } from 'grommet';
import withRedux from 'next-redux-wrapper';
import { configureStore } from '@/store';
import { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

interface IAppProps extends AppProps {
  pageProps: any;
  apolloClient: ApolloClient<NormalizedCache>;
  apolloState: NormalizedCacheObject;
  store: Store;
}

class MyApp extends App<IAppProps> {
  /**
   * `getInitialProps` runs on server if it's server rendering, and does on client if page transition occurs by using `Link` component or `props.url.push()`.
   */
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    /**
     * Make sure the returned object from getInitialProps is a plain `Object` and not using `Date`, `Map` or `Set`.
     * getInitialProps can not be used in children components. Only in `pages`.
     */
    return { pageProps };
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    const { Component, pageProps, apolloClient, store } = this.props;

    return (
      <Container>
        <GlobalStyle />

        <ReduxProvider store={store}>
          <ApolloProvider client={apolloClient}>
            {/* TODO: theme */}
            <Grommet theme={grommetTheme}>
              <Component {...pageProps} />
            </Grommet>
          </ApolloProvider>
        </ReduxProvider>
      </Container>
    );
  }
}

export default compose(
  withApolloClient,
  withRedux(configureStore),
)(MyApp);
