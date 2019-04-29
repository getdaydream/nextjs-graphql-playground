import React from 'react';
import Link from 'next/link';
import Header from '@/containers/Headers';
import { NextFC } from 'next';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';
import { initApolloClient } from '@/utils';
import { parseCookies } from '@/utils/parse-cookies';

const Home: NextFC = () => {
  return (
    <div>
      <Header />

      <div>test apollo client</div>

      <Link href="/user">
        <a>s</a>
      </Link>
    </div>
  );
};

Home.getInitialProps = async (ctx: any) => {
  const gqClient = initApolloClient({
    initialState: {},
    getToken: () => parseCookies(ctx.req).token,
  });
  try {
    const response = await gqClient.query<IQueryMe>({ query: QueryMe });
    return { account: { user: response.data.me } };
  } catch (e) {
    return {};
  }
};

export default Home;
