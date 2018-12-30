import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {
  login: (
    params: { email: string; password: string },
  ) => Promise<{ error: string }>;
}

@observer
class Login extends React.Component<Props> {
  public handleClickSubmit = async () => {
    const { login, history } = this.props;
    const { error } = await login({
      email: '275522141@qq.com',
      password: '12345678',
    });
    if (!error) {
      history.push('/post');
    }
  };

  public render() {
    return <button onClick={this.handleClickSubmit}>submit</button>;
  }
}

export default inject(store => ({
  login: store.loginView.login,
}))(withRouter(Login));
