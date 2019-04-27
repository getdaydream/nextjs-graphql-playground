import React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Header from '@/containers/Headers';
import { Query } from 'react-apollo';
import { gqClient } from '@/utils/init-apollo-client';

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

  test = () => {
    const observable = gqClient.watchQuery<{ me: string }>({
      query: QUERY_ME,
    });
    observable.subscribe(value => {
      console.log(value);
    });
  };

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
              return error.message;
            }

            return JSON.stringify(data);
          }}
        </Query>

        <div onClick={this.test}>test apollo client</div>

        <Link href="/user">
          <a>user</a>
        </Link>
      </div>
    );
  }
}

export default Home;
