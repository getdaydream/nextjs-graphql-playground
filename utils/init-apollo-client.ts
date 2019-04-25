import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';

interface CreateApolloClientOptions {
  getToken: () => any;
  initialState?: any;
}

const isBrowser = (process as any).browser;
console.log('is browser :' + isBrowser);

let gqClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch,
});

const authMiddleware = (token: string) => {
  return new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return forward!(operation);
  });
};

const create = (options: CreateApolloClientOptions) => {
  const { getToken } = options;
  const token = getToken();

  const handlers = [
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    httpLink,
  ];

  if (token) {
    handlers.unshift(authMiddleware(token));
  }

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from(handlers),
    cache: new InMemoryCache().restore(options.initialState || {}),
  });
};

const initApolloClient = (options: CreateApolloClientOptions) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(options);
  }

  // Reuse client on the client-side
  if (!gqClient) {
    gqClient = create(options);
  }

  return gqClient;
};

export default initApolloClient;
