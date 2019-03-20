/**
 * Apollo Boost is a zero-config way to start using Apollo Client.
 * https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost
 */
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  fetch,
  fetchOptions: { credentials: 'include' },
  uri: 'http://192.168.100.67:3000/graphql',
});
