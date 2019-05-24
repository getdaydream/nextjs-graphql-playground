import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import SignupForm from './SignupForm';

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

  return (
    <Modal
      onClose={() => setGlobalOverlay('')}
      open={true}
      centered={true}
      closeIcon={true}
      closeOnDimmerClick={true}
      size="small"
      basic
    >
      {currnetTab === TabEnum.Login && <LoginForm />}
      {currnetTab === TabEnum.Signup && <SignupForm />}
    </Modal>
  );
};

export default connect(
  null,
  dispatchProps,
)(AuthModal);
