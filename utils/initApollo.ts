/**
 * Apollo Boost is a zero-config way to start using Apollo Client.
 * https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost
 */
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

let apolloClient: ApolloClient<{}>;

const createClient = (
  initialState: any,
  // options: { getToken: () => string },
) => {
  // const { getToken } = options;

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    // ssrMode: process.browser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState || {}),
    uri: 'http://192.168.0.4:3000/graphql',
    credentials: 'include',
  });
};

export const client = new ApolloClient({
  // cache: new InMemoryCache(),
  fetch,
  fetchOptions: {
    credentials: 'include',
  },
  uri: 'http://192.168.100.67:3000/graphql',
  // This function is called on each request.
  // It takes a GraphQL operation and can return a promise.
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        authorization: `bearer `,
      },
    });
  },
});

const initApolloClient = (initialState: any) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === undefined) {
    return createClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState);
  }
  return apolloClient;
};

export default initApolloClient;
