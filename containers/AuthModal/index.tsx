import React, { useState } from 'react';
import { Box } from 'grommet';
import LoginForm from './LoginForm';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';
import { Modal, Menu } from 'semantic-ui-react';
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
    >
      <Box fill={true} align="center" justify="center">
        <Box align="center">
          <Menu secondary>
            <Menu.Item
              name={TabEnum.Login}
              active={currnetTab === TabEnum.Login}
              onClick={() => setCurrentTab(TabEnum.Login)}
            />
            <Menu.Item
              name={TabEnum.Signup}
              active={currnetTab === TabEnum.Signup}
              onClick={() => setCurrentTab(TabEnum.Signup)}
            />
          </Menu>

          {currnetTab === TabEnum.Login && <LoginForm />}
          {currnetTab === TabEnum.Signup && <SignupForm />}
        </Box>
      </Box>
    </Modal>
  );
};

export default connect(
  null,
  dispatchProps,
)(AuthModal);
