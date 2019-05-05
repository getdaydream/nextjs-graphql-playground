import React, { Fragment } from 'react';
import cookie from 'cookie';
import {
  InputGroup,
  ControlGroup,
  FormGroup,
  Button,
  Intent,
  Icon,
} from '@blueprintjs/core';
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import { inject } from 'mobx-react';
import { IStore, InjectProps } from '@/stores';
import { gqClient } from '@/utils/init-apollo-client';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { QueryLoginResult } from '@/graphql/user';

type PropsInternal = WithApolloClient<InjectProps>;

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
        <FormGroup>
          <ControlGroup vertical>
            <InputGroup
              large
              placeholder="邮箱"
              onChange={this.handleChangeEmail}
              type="email"
              leftIcon={<Icon icon="envelope" />}
            />
            <InputGroup
              large
              placeholder="密码"
              onChange={this.handleChangePassword}
              type="password"
              leftIcon={<Icon icon="lock" />}
            />
          </ControlGroup>
        </FormGroup>
        <Button
          text="登录"
          fill
          intent={Intent.PRIMARY}
          onClick={this.handleClickLogin}
        />
      </Fragment>
    );
  }
}

export default compose(
  withApollo,
  inject((store: IStore) => store),
)(LoginForm);
