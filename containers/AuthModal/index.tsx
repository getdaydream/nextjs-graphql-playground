import React, { useState } from 'react';
import { Box } from 'grommet';
import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';
import { Modal } from 'antd';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';

enum TabEnum {
  Login = '登录',
  Signup = '注册',
}

const dispatchProps = {
  setGlobalOverlay,
};

type AuthModalProps = typeof dispatchProps;

const AuthModal: React.FC<AuthModalProps> = ({ setGlobalOverlay }) => {
  const [currnetTab, setCurrentTab] = useState(TabEnum.Login);

  const handleChangeTab = (value: string) => {
    setCurrentTab(value as TabEnum);
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
          <LoginForm />
        </Box>
      </Box>
    </Modal>
  );
};

export default connect(
  null,
  dispatchProps,
)(AuthModal);
