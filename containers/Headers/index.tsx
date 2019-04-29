import React from 'react';
import LoginModal from '../LoginModal';
import { Button, Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { IStore } from '@/stores';

interface Props {
  store: IStore;
}

class Header extends React.Component<Props> {
  render() {
    const {
      globalHeader: { showLoginModal, toggleLoginModal },
      account: { user },
    } = this.props.store;

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

export default inject((store: IStore) => store)(observer(Header));
