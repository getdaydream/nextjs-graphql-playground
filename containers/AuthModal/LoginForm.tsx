import React, { Fragment, useState } from 'react';
import cookie from 'cookie';
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { QueryLoginResult, QueryMe } from '@/graphql/user';
import { Button, Input, Icon } from 'antd';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';

const InputGroup = Input.Group;

const dispatachProps = {
  setGlobalOverlay,
};

type LoginFormProps = WithApolloClient<typeof dispatachProps>;

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
      <InputGroup size="large">
        <Input
          placeholder="邮箱"
          onChange={handleChangeEmail}
          type="email"
          prefix={<Icon type="user" />}
        />
        <Input.Password
          placeholder="密码"
          onChange={handleChangePassword}
          prefix={<Icon type="lock" />}
        />
      </InputGroup>
      <Button block onClick={handleClickLogin}>
        登录
      </Button>
    </Fragment>
  );
};

export default compose(
  withApollo,
  connect(
    null,
    dispatachProps,
  ),
)(LoginForm);
