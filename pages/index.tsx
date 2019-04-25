import React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Header from '@/containers/Headers';
import { Query } from 'react-apollo';

const QUERY_ME = gql`
  {
    me {
      id
      nickname
    }
  }
`;

class Home extends React.Component {
  static async getInitialProps() {
    //
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Header />

        <Query query={QUERY_ME}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'loading';
            }
            if (error) {
              return error.message
            }

            return JSON.stringify(data)
          }}
        </Query>

        <Link href="/user">
          <a>user</a>
        </Link>
      </div>
    );
  }
}

export default Home;
