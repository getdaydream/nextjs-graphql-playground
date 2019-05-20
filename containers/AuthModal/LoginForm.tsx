import React, { Fragment, useState } from 'react';
import cookie from 'cookie';
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { QueryLoginResult, QueryMe } from '@/graphql/user';
import { Button, Input, Icon } from 'semantic-ui-react';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';

const dispatchProps = {
  setGlobalOverlay,
};

type LoginFormProps = WithApolloClient<typeof dispatchProps>;

const LoginForm: React.FC<LoginFormProps> = ({ setGlobalOverlay, client }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleClickLogin = async () => {
    // TODO: handle wrong email password error
    const {
      data: {
        login: { token, user },
      },
    } = await client.query<IQueryLoginResult, IQueryLoginResultVariables>({
      query: QueryLoginResult,
      variables: { password, email },
    });
    client.writeQuery({
      query: QueryMe,
      data: { me: user },
    });
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    setGlobalOverlay('');
  };

  return (
    <Fragment>
      <Input
        placeholder="邮箱"
        onChange={handleChangeEmail}
        type="email"
        prefix={<Icon type="user" />}
      />
      <Input
        placeholder="密码"
        onChange={handleChangePassword}
        prefix={<Icon type="lock" />}
        type="password"
      />
      <Button onClick={handleClickLogin}>登录</Button>
    </Fragment>
  );
};

export default compose(
  withApollo,
  connect(
    null,
    dispatchProps,
  ),
)(LoginForm);
