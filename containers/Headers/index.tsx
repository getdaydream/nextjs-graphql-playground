import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { InjectProps, IStore } from '@/stores';
import { observable, action } from 'mobx';
import { Button, Intent } from '@blueprintjs/core';

class Header extends React.Component<InjectProps> {
  @observable
  showAuthModal = false;

  @action
  toggleAuthModal = () => {
    this.showAuthModal = !this.showAuthModal;
  };

  render() {
    const {
      account: { user },
    } = this.props.store;

    const { showAuthModal, toggleAuthModal } = this;

    return (
      <Box direction="row" pad="small" style={{ background: 'white' }}>
        {showAuthModal && <AuthModal onClose={toggleAuthModal} />}

        {user ? (
          user.nickname
        ) : (
          <Button
            text="登陆"
            intent={Intent.PRIMARY}
            onClick={toggleAuthModal}
          />
        )}
      </Box>
    );
  }
}

export default inject((store: IStore) => store)(observer(Header));
