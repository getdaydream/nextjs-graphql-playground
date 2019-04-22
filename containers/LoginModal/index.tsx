import React from 'react';
import styles from './styles/index.css';
import { inject, observer } from 'mobx-react';
import { IStore } from '@/stores';
import initApolloClient from '@/utils/initApolloClient';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';

interface Props {
  store?: IStore;
}

class LoginModal extends React.Component<Props> {
  handleClickLogin = async () => {
    const {
      globalHeader: { toggleLoginModal },
    } = this.props.store!;
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
    toggleLoginModal();
  };

  render() {
    return (
      <div className={styles.root}>
        <button onClick={this.handleClickLogin}>login</button>
      </div>
    );
  }
}

export default inject('store')(observer(LoginModal));
