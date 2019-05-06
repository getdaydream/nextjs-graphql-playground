import React, { Fragment } from 'react';
import cookie from 'cookie';
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import { inject } from 'mobx-react';
import { IStore, MstStoreProps } from '@/stores';
import { gqClient } from '@/utils/init-apollo-client';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { QueryLoginResult } from '@/graphql/user';
import { Button, Input, Icon } from 'antd';

const InputGroup = Input.Group;

type PropsInternal = WithApolloClient<MstStoreProps>;

class LoginForm extends React.Component<PropsInternal> {
  password = '';
  email = '';

  handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.email = e.currentTarget.value;
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.password = e.currentTarget.value;
  };

  handleClickLogin = async () => {
    const { password, email } = this;
    const {
      data: {
        login: { token, user },
      },
    } = await gqClient.query<IQueryLoginResult, IQueryLoginResultVariables>({
      query: QueryLoginResult,
      variables: { password, email },
    });
    const {
      account: { setUser },
      globalHeader: { setShowAuthModal },
    } = this.props.store;
    setUser(user);
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    setShowAuthModal(false);
  };

  render() {
    return (
      <Fragment>
        <InputGroup size="large">
          <Input
            placeholder="邮箱"
            onChange={this.handleChangeEmail}
            type="email"
            prefix={<Icon type="user" />}
          />
          <Input.Password
            placeholder="密码"
            onChange={this.handleChangePassword}
            prefix={<Icon type="lock" />}
          />
        </InputGroup>
        <Button block onClick={this.handleClickLogin}>
          登录
        </Button>
      </Fragment>
    );
  }
}

export default compose(
  withApollo,
  inject((store: IStore) => store),
)(LoginForm);
