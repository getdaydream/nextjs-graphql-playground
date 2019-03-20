import React from 'react';
import { client } from '../utils/graphql';
import gql from 'graphql-tag';

class Home extends React.Component {
  componentDidMount() {
    client
      .query({
        query: gql`
          {
            user(id: 1) {
              id
              nickname
            }
          }
        `,
      })
      .then(result => {
        console.log(result);
      });
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
