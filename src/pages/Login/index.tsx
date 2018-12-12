import { userActions } from '@/store/user';
import axios from '@/utils/axios';
import React from 'react';
import { connect } from 'react-redux';

interface Props {
  onLogin: (params: { email: string; password: string }) => void;
}

class Login extends React.Component<Props> {
  public handleClickSubmit = () => {
    // const { onLogin } = this.props;
    // onLogin({
    //   email: '27552214@qq.com',
    //   password: '12345678',
    // });

    axios.post('/api/users/login', {
      email: '27552214@qq.com',
      password: '12345678',
    });
  };

  public render() {
    return <button onClick={this.handleClickSubmit}>submit</button>;
  }
}

export default connect(
  () => ({}),
  {
    onLogin: userActions.login.request,
  },
)(Login);
