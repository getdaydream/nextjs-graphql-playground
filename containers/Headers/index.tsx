import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { InjectProps, IStore } from '@/stores';
import { Button, Intent } from '@blueprintjs/core';
import Avatar from '@/components/Avatar';

class Header extends React.Component<InjectProps> {
  render() {
    const {
      account: { user },
      globalHeader: { showAuthModal, setShowAuthModal },
    } = this.props.store;

    return (
      <Box direction="row" pad="small" style={{ background: 'white' }}>
        {showAuthModal && <AuthModal />}

        {user ? (
          <Box direction="row" justify="between" fill>
            <div />
            <Box direction="row" justify="end" align="center">
              <Button text="Post" minimal/>
              <Avatar />
            </Box>
          </Box>
        ) : (
          <Button
            text="登陆"
            intent={Intent.PRIMARY}
            onClick={() => setShowAuthModal(true)}
          />
        )}
      </Box>
    );
  }
}

export default inject((store: IStore) => store)(observer(Header));
