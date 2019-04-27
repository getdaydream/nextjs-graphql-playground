import * as React from 'react';
import app, { Container } from 'next/app';
import { Normalize } from 'styled-normalize';
import GlobalStyle from '@/containers/GlobalStyle';
import { NormalizedCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { withApolloClient, grommetTheme } from '@/utils';
import { Grommet } from 'grommet';

interface IAppProps {
  Component: any;
  pageProps: any;
  req: any;
  apolloClient: ApolloClient<NormalizedCache>;
  apolloState: NormalizedCacheObject;
  router: any;
}

class App extends app<IAppProps> {
  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Normalize />
        <GlobalStyle />
        <ApolloProvider client={apolloClient}>
          {/* TODO: theme */}
          <Grommet theme={grommetTheme}>
            <Component {...pageProps} />
          </Grommet>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(App);
