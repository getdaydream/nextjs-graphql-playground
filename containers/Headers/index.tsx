import React from 'react';
import LoginModal from '../LoginModal';
import { Button, Box } from 'grommet';
import { observer } from 'mobx-react';
import { InjectProps, inject } from '@/stores';
import { observable, action } from 'mobx';

class Header extends React.Component<InjectProps> {
  @observable
  showLoginModal = false;

  @action
  toggleLoginModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  render() {
    const {
      account: { user },
    } = this.props.store;

    const { showLoginModal, toggleLoginModal } = this;

    return (
      <Box direction="row" pad="small" style={{ background: 'white' }}>
        {showLoginModal && <LoginModal onClose={toggleLoginModal} />}

        {user ? (
          user.nickname
        ) : (
          <Button label="登陆" primary onClick={toggleLoginModal} />
        )}
      </Box>
    );
  }
}

export default inject(observer(Header));
