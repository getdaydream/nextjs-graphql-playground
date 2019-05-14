import React, { useState } from 'react';
import { Box } from 'grommet';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Modal, Tabs } from 'antd';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';

const { TabPane } = Tabs;

enum TabEnum {
  Login = '登录',
  Signup = '注册',
}

const dispatchProps = {
  setGlobalOverlay,
};

type AuthModalProps = typeof dispatchProps;

const AuthModal: React.FC<AuthModalProps> = ({ setGlobalOverlay }) => {
  const [currnetTab, setCurrnetTab] = useState(TabEnum.Login);

  const handleChangeTab = (value: string) => {
    setCurrnetTab(value as TabEnum);
  };

  return (
    <Modal
      onCancel={() => setGlobalOverlay('')}
      visible={true}
      centered
      footer={null}
    >
      <Box fill={true} align="center" justify="center">
        <Box align="center">
          <Tabs activeKey={currnetTab} onChange={handleChangeTab}>
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
};

export default connect(
  null,
  dispatchProps,
)(AuthModal);
