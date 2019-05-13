import React from 'react';
// import cookie from 'cookie';
// import { WithApolloClient } from 'react-apollo';
// import { QueryLoginResult } from '@/graphql/user';
// import {
//   IQueryLoginResult,
//   IQueryLoginResultVariables,
// } from '@/graphql/__generated-types__';
// import { MstStoreProps } from '@/stores';
import { observable, action } from 'mobx';
import { Box } from 'grommet';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
// import { gqClient } from '@/utils/init-apollo-client';
import { Modal, Tabs } from 'antd';

const { TabPane } = Tabs;

enum TabEnum {
  Login = '登录',
  Signup = '注册',
}

// type PropsInternal = WithApolloClient<MstStoreProps>;

class AuthModal extends React.Component {
  @observable
  currnetTab: TabEnum = TabEnum.Login;

  @action
  setCurrentTab = (currnetTab: TabEnum) => {
    this.currnetTab = currnetTab;
  };

  handleClickLogin = async () => {
    // const {
    //   store: {
    //     globalHeader: { setShowAuthModal },
    //   },
    // } = this.props;
    // const {
    //   data: {
    //     login: { token, user },
    //   },
    // } = await gqClient.query<IQueryLoginResult, IQueryLoginResultVariables>({
    //   query: QueryLoginResult,
    //   variables: { email: '1@qq.com', password: '12345678' },
    // });
    // const {
    //   account: { setUser },
    // } = this.props.store;
    // setUser(user);
    // document.cookie = cookie.serialize('token', token, {
    //   maxAge: 7 * 24 * 60 * 60, // 7 days
    // });
    // setShowAuthModal(false);
  };

  render() {
    // const {
    //   store: {
    //     globalHeader: { setShowAuthModal },
    //   },
    // } = this.props;

    return (
      <Modal
        // onCancel={() => setShowAuthModal(false)}
        visible={true}
        centered
        footer={null}
      >
        <Box fill={true} align="center" justify="center">
          <Box align="center">
            <Tabs>
              <TabPane key={TabEnum.Login} tab={TabEnum.Login}>
                <LoginForm />
              </TabPane>
              <TabPane key={TabEnum.Signup} tab={TabEnum.Signup}>
                <SignupForm />
              </TabPane>
            </Tabs>
          </Box>
        </Box>
      </Modal>
    );
  }
}

export default AuthModal;
