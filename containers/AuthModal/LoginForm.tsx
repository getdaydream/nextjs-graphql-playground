import React, { Fragment } from 'react';
import {
  InputGroup,
  ControlGroup,
  FormGroup,
  Button,
  Intent,
  Icon,
} from '@blueprintjs/core';

class LoginForm extends React.Component {
  password = '';
  email = '';

  handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.email = e.currentTarget.value;
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.password = e.currentTarget.value;
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
        <Button text="登录" fill intent={Intent.PRIMARY} />
      </Fragment>
    );
  }
}

export default LoginForm;
