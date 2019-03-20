import React from 'react';
import { client } from '../utils/graphql';
import gql from 'graphql-tag';

class Home extends React.Component {
  componentDidMount() {
    client
      .query({
        query: gql`
          {
            me {
              id
              nickname
            }
          }
        `,
        // query: gql`
        //   query {
        //     login(email: "1@qq.com", password: "12345678") {
        //       user {
        //         nickname
        //       }
        //       token
        //     }
        //   }
        // `,
      })
      .then(result => {
        console.log(result);
        // localStorage.setItem('token', result.data.login.token);
      });
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
