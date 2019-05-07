import React from 'react';
import { NextFC, NextContext } from 'next';
import { IStoreSnapshotIn } from '@/stores';
import { initApolloClient } from '@/utils';
import { parseCookies } from '@/utils/parse-cookies';
import Header from '@/containers/Headers';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';

interface InitialProps {
  mstStore: IStoreSnapshotIn;
}

const Post: NextFC<InitialProps> = () => {
  return (
    <div style={{ background: 'white' }}>
      <Header />
    </div>
  );
};

Post.getInitialProps = async ({ req }: NextContext): Promise<InitialProps> => {
  const gqClient = initApolloClient({
    initialState: {},
    getToken: () => parseCookies(req).token,
  });
  try {
    const response = await gqClient.query<IQueryMe>({ query: QueryMe });
    return {
      mstStore: {
        account: { user: response.data.me },
      },
    };
  } catch (e) {
    return { mstStore: {} };
  }
};

export default Post;
