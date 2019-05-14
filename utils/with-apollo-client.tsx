// copy from  https://github.com/itxuye/blog-admin
// nextjs examples : with-apollo
import * as React from 'react';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getDataFromTree } from 'react-apollo';
import { NextAppContext } from 'next/app';
import Head from 'next/head';
import initApollo from './init-apollo-client';
import { isBrowser } from './is';
import { parseCookies } from './parse-cookies';

export default (App: any) => {
  App.displayName = 'App';
  return class WithData extends React.Component {
    public static displayName = `WithData(${App.displayName})`;

    public static async getInitialProps(ctx: NextAppContext & IAppContext) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      const apollo: any = initApollo({
        initialState: {},
        getToken: () => parseCookies(req).token,
      });
      ctx.ctx.apolloClient = apollo;

      let appProps: object = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }
      // Extract query data from the Apollo's store
      const apolloState: NormalizedCacheObject = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }
    // apolloClient doesn't exist yet
    public apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      this.apolloClient = initApollo({
        initialState: props.apolloState,
        getToken: () => parseCookies().token,
      });
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
