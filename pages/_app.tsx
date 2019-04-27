/**
 * Next.js uses the App component to initialize pages.
 * You can override it and control the page initialization.
 * You can Inject additional data into pages (for example by processing GraphQL queries)
 * https://nextjs.org/docs/#custom-app
 */

import React from 'react';
import App, { Container, NextAppContext, AppProps } from 'next/app';
import { initStore, IStore } from '@/stores';
import { getSnapshot } from 'mobx-state-tree';
import { Provider } from 'mobx-react';
import { Normalize } from 'styled-normalize';
import GlobalStyle from '@/containers/GlobalStyle';
import { ApolloClient } from 'apollo-client';
import { NormalizedCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { isBrowser } from '@/utils/is';
import withApolloClient from '@/utils/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

interface IAppProps extends AppProps {
  pageProps: any;
  apolloClient: ApolloClient<NormalizedCache>;
  apolloState: NormalizedCacheObject;
}

interface InitialProps {
  isServer: boolean;
  initialState: IStore;
}

class MyApp extends App<IAppProps> {
  /**
   * `getInitialProps` runs on server if it's server rendering, and does on client if page transition occurs by using `Link` component or `props.url.push()`.
   */
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = !isBrowser;
    const store = initStore();
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
    return { pageProps, isServer, initialState: getSnapshot(store) };
  }

  private store: IStore;

  constructor(props: InitialProps & any) {
    super(props);
    this.store = initStore(props.initialState);
    if (isBrowser) {
      console.log(getSnapshot(this.store));
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Normalize />
        <GlobalStyle />
        <Provider store={this.store}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
