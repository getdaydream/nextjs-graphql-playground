/**
 * Apollo Boost is a zero-config way to start using Apollo Client.
 * https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost
 */
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  fetch,
  fetchOptions: {
    credentials: 'include',
    headers: {
      authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…xMTl9.9fALG5e4hTfR0nV0RT1tRBso6Ci6yBk359oGQlbLFRM`,
    },
  },
  uri: 'http://192.168.0.4:3000/graphql',
});
