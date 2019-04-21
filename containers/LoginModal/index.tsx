import React from 'react';
import { Content, Root } from './styles';

class LoginModal extends React.Component {
  email = '';
  password = '';

  handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.email = e.currentTarget.value;
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.password = e.currentTarget.value;
  };

  render() {
    return (
      <Root>
        <Content>
          <input type="email" onChange={this.handleChangeEmail} />
          <input type="password" onChange={this.handleChangePassword} />
        </Content>
      </Root>
    );
  }
}

export default LoginModal;
