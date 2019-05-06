import React from 'react';
import dynamic from 'next/dynamic';
import { NextFC, NextContext } from 'next';
import { IStoreSnapshotIn } from '@/stores';
import { initApolloClient } from '@/utils';
import { parseCookies } from '@/utils/parse-cookies';
import Header from '@/containers/Headers';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';

const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
  ssr: false,
});

interface InitialProps {
  mstStore: IStoreSnapshotIn;
  status: 'view' | 'create' | 'edit';
}

const Post: NextFC<InitialProps> = ({ status }) => {
  return (
    <div style={{ background: 'white' }}>
      <Header />
      {status !== 'view' && <ArticleEdit />}
    </div>
  );
};

Post.getInitialProps = async ({
  asPath,
  req,
}: NextContext): Promise<InitialProps> => {
  const status = asPath.includes('create')
    ? 'create'
    : asPath.includes('edit')
    ? 'edit'
    : 'view';

  const gqClient = initApolloClient({
    initialState: {},
    getToken: () => parseCookies(req).token,
  });
  try {
    const response = await gqClient.query<IQueryMe>({ query: QueryMe });
    return { mstStore: { account: { user: response.data.me } }, status };
  } catch (e) {
    return { mstStore: {}, status };
  }
};

export default Post;
