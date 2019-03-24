/**
 * Next.js uses the App component to initialize pages.
 * You can override it and control the page initialization.
 * You can Inject additional data into pages (for example by processing GraphQL queries)
 * https://nextjs.org/docs/#custom-app
 */

import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { initStore, IStore } from '@/stores';
import { getSnapshot } from 'mobx-state-tree';
import { Provider } from 'mobx-react';

interface InitialProps {
  isInitialRender: boolean;
  initialState: IStore;
}

class MyApp extends App {
  /**
   * `getInitialProps` runs on server if it's server rendering, and does on client if page transition occurs by using `Link` component or `props.url.push()`.
   */
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isInitialRender = typeof window === 'undefined';
    const store = initStore(isInitialRender);

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
    return { pageProps, isInitialRender, initialState: getSnapshot(store) };
  }

  private store: IStore;

  constructor(props: InitialProps & any) {
    super(props);
    this.store = initStore(props.isInitialRender, props.initialState);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
