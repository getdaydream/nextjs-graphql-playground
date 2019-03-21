import React from 'react';
import gql from 'graphql-tag';
import { client } from '../utils/initApolloClient';
// import { NextAppContext } from 'next/app';

class Home extends React.Component {
  static async getInitialProps() {
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

  async componentDidMount() {
    console.log(this.props);

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
    console.log(r.data);
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
