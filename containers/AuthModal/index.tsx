import React from 'react';
import cookie from 'cookie';
import { withApollo, WithApolloClient, compose } from 'react-apollo';
import { QueryLoginResult } from '@/graphql/user';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';
import { inject } from 'mobx-react';
import { IStore, InjectProps } from '@/stores';
import { Overlay, Tabs, Tab, Classes } from '@blueprintjs/core';
import { observable, action } from 'mobx';
import { Box } from 'grommet';
import { AuthCard, CloseIcon } from './styles';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { gqClient } from '@/utils/init-apollo-client';

enum TabEnum {
  Login = '登录',
  Signup = '注册',
}

type PropsInternal = WithApolloClient<InjectProps>;

class AuthModal extends React.Component<PropsInternal> {
  @observable
  currnetTab: TabEnum = TabEnum.Login;

  @action
  setCurrentTab = (currnetTab: TabEnum) => {
    this.currnetTab = currnetTab;
  };

  handleClickLogin = async () => {
    const {
      store: {
        globalHeader: { setShowAuthModal },
      },
    } = this.props;
    const {
      data: {
        login: { token, user },
      },
    } = await gqClient.query<IQueryLoginResult, IQueryLoginResultVariables>({
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
    setShowAuthModal(false);
  };

  render() {
    const {
      store: {
        globalHeader: { setShowAuthModal },
      },
    } = this.props;

    return (
      <Overlay
        onClose={() => setShowAuthModal(false)}
        isOpen={true}
        canOutsideClickClose
      >
        <Box fill={true} align="center" justify="center">
          <AuthCard>
            <Box width="100%" align="end">
              <CloseIcon icon="cross" onClick={() => setShowAuthModal(false)} />
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
