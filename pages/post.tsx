import React from 'react';
import dynamic from 'next/dynamic';
import { NextFC } from 'next';
import { IStoreSnapshotIn } from '@/stores';
import { initApolloClient } from '@/utils';
import { parseCookies } from '@/utils/parse-cookies';
import Header from '@/containers/Headers';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';

const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
  ssr: false,
});

const Post: NextFC = () => {
  return (
    <div style={{ background: 'white' }}>
      <Header />
      <ArticleEdit />
    </div>
  );
};

Post.getInitialProps = async (ctx: any): Promise<IStoreSnapshotIn> => {
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

export default Post;
