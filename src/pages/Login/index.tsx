import { inject, observer } from 'mobx-react';
import React from 'react';

interface Props {
  login: (params: { email: string; password: string }) => Promise<void>;
}

@observer
class Login extends React.Component<Props> {
  public componentDidMount() {
    console.log(this);
  }

  public handleClickSubmit = () => {
    const { login } = this.props;
    login({
      email: '27552214@qq.com',
      password: '12345678',
    });
  };

  public render() {
    return <button onClick={this.handleClickSubmit}>submit</button>;
  }
}

export default inject(store => ({
  login: store.loginView.login,
}))(Login);
