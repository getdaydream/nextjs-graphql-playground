import React from 'react';
import gql from 'graphql-tag';
import initApolloClient from '@/utils/initApolloClient';
import { NextContext } from 'next';
import Link from 'next/link';

class Home extends React.Component {
  static async getInitialProps(ctx: NextContext) {
    const client = initApolloClient(ctx);
    const r = await client.query({
      query: gql`
        {
          me {
            id
            nickname
          }
        }
      `,
    });
    return r;
  }

  render() {
    return (
      <div>
        Home
        <Link href="/user">
          <a>user</a>
        </Link>
      </div>
    );
  }
}

export default Home;
