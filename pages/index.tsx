import React from 'react';
import gql from 'graphql-tag';
import initApolloClient from '@/utils/init-apollo-client';
import { NextContext } from 'next';
import Link from 'next/link';
import Header from '@/containers/Headers';

class Home extends React.Component {
  static async getInitialProps(ctx: NextContext) {
    try {
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
    } catch (e) {
      return null;
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Header />
        Home
        <Link href="/user">
          <a>user</a>
        </Link>
      </div>
    );
  }
}

export default Home;
