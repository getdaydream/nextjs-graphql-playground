import React, { useState } from 'react';
import cookie from 'cookie';
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { QueryLoginResult, QueryMe } from '@/graphql/user';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';
import { Button, Segment, Grid, Form, Divider } from 'semantic-ui-react';

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
    <Segment size="massive" placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="邮箱"
              placeholder="邮箱"
              type="email"
              onChange={handleChangeEmail}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="密码"
              type="password"
              onChange={handleChangePassword}
              placeholder="密码"
            />

            <Button content="登录" primary onClick={handleClickLogin} />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button content="注册" icon="signup" size="large" />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  );
};

export default compose(
  withApollo,
  connect(
    null,
    dispatchProps,
  ),
)(LoginForm);
 