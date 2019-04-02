import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import { NextContext } from 'next';
import cookie from 'cookie';

let gqClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: 'http://192.168.0.4:3000/graphql',
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

const create = (options: CreateApolloClientOptions = {}) => {
  const { token } = options;

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
    ssrMode: typeof window !== undefined,
    link: ApolloLink.from(handlers),
    cache: new InMemoryCache(),
  });
};

interface CreateApolloClientOptions {
  token?: string;
}

const initApolloClient = (ctx?: NextContext) => {
  if (typeof window === undefined) {
    return create();
  }

  if (!gqClient) {
    let token;
    if (ctx && ctx.req && ctx.req.headers.cookie) {
      // 如果是在后端渲染时初始化 apollo-client，从前端的 cookie 中取出token
      const cookies = cookie.parse(ctx.req.headers.cookie);
      token = cookies['token'];
    } else if (ctx && !ctx.req) {
      // TODO: 优化逻辑
      const cookies = cookie.parse(document.cookie);
      token = cookies['token'];
    }

    gqClient = create({ token });
  }

  return gqClient;
};

export default initApolloClient;
