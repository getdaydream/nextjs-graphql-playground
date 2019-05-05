import React from 'react';
import cookie from 'cookie';
import { withApollo, WithApolloClient, compose } from 'react-apollo';
import { QueryLoginResult } from '@/graphql/user';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { inject } from 'mobx-react';
import { IStore } from '@/stores';
import { Overlay, Tabs, Tab, Classes } from '@blueprintjs/core';
import { observable, action } from 'mobx';
import { Box } from 'grommet';
import { AuthCard, CloseIcon } from './styles';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface Props {
  onClose: () => void;
  store: IStore;
}

enum TabEnum {
  Login = '登录',
  Signup = '注册',
}

type PropsInternal = WithApolloClient<Props>;

class AuthModal extends React.Component<PropsInternal> {
  @observable
  currnetTab: TabEnum = TabEnum.Login;

  @action
  setCurrentTab = (currnetTab: TabEnum) => {
    this.currnetTab = currnetTab;
  };

  handleClickLogin = async () => {
    const { client, onClose } = this.props;
    const {
      data: {
        login: { token, user },
      },
    } = await client.query<IQueryLoginResult, IQueryLoginResultVariables>({
      query: QueryLoginResult,
      variables: { email: '1@qq.com', password: '12345678' },
    });
    const {
      account: { setUser },
    } = this.props.store;
    setUser(user);
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    onClose();
  };

  render() {
    const { onClose } = this.props;

    return (
      <Overlay onClose={onClose} isOpen={true} canOutsideClickClose>
        <Box fill={true} align="center" justify="center">
          <AuthCard>
            <Box width="100%" align="end">
              <CloseIcon icon="cross" onClick={onClose} />
            </Box>
            <Box align="center">
              <Tabs
                id="auth-tab"
                large
                className={Classes.FILL}
                renderActiveTabPanelOnly
              >
                <Tab
                  id={TabEnum.Login}
                  title={TabEnum.Login}
                  panel={<LoginForm />}
                />
                <Tab
                  id={TabEnum.Signup}
                  title={TabEnum.Signup}
                  panel={<SignupForm />}
                />
              </Tabs>
            </Box>
          </AuthCard>
        </Box>
      </Overlay>
    );
  }
}

export default compose(
  withApollo,
  inject((store: IStore) => store),
)(AuthModal);
