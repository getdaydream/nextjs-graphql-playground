import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '@/stores';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { Root } from './styles';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

interface Props {
  store?: IStore;
}

class LoginModal extends React.Component<Props> {
  handleClickLogin = async (client: ApolloClient<any>) => {
    const {
      globalHeader: { toggleLoginModal },
    } = this.props.store!;
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
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    console.log('login');
    toggleLoginModal();
  };

  render() {
    return (
      <Root>
        <ApolloConsumer>
          {client => (
            <button onClick={() => this.handleClickLogin(client)}>login</button>
          )}
        </ApolloConsumer>
      </Root>
    );
  }
}

export default inject('store')(observer(LoginModal));
