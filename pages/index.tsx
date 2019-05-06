import React from 'react';
import Link from 'next/link';
import Header from '@/containers/Headers';
import { NextFC } from 'next';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';
import { initApolloClient } from '@/utils';
import { parseCookies } from '@/utils/parse-cookies';
import { IStoreSnapshotIn } from '@/stores';

const Home: NextFC = () => {
  return (
    <div>
      <Header />

      <div>test apollo client</div>

      <Link href="/user">
        <a>user</a>
      </Link>
    </div>
  );
};

Home.getInitialProps = async (
  ctx: any,
): Promise<{ mstStore: IStoreSnapshotIn }> => {
  const gqClient = initApolloClient({
    initialState: {},
    getToken: () => parseCookies(ctx.req).token,
  });
  try {
    const response = await gqClient.query<IQueryMe>({ query: QueryMe });
    return { mstStore: { account: { user: response.data.me } } };
  } catch (e) {
    return {
      mstStore: {},
    };
  }
};

export default Home;
