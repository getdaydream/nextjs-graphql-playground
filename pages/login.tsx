import React from 'react';
import initApolloClient from '@/utils/initApolloClient';
import gql from 'graphql-tag';
import Cookies from 'js-cookie';

class Login extends React.Component {
  async componentDidMount() {
    const client = initApolloClient();
    const {
      data: {
        login: { token },
      },
    } = await client.query({
      query: gql`
        {
          login(email: "1@qq.com", password: "12345678") {
            token
          }
        }
      `,
    });
    Cookies.set('token', token);
    console.log('login');
  }

  handleClickLogin = () => {
    //
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClickLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
