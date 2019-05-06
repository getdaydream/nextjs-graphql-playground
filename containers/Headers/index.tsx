import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { InjectProps, IStore } from '@/stores';
import { Button } from 'antd';
import Avatar from '@/components/Avatar';
import Link from 'next/link';

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
              <Link href="/post/create">
                <Button>Post</Button>
              </Link>
              <Avatar />
            </Box>
          </Box>
        ) : (
          <Button onClick={() => setShowAuthModal(true)}>登录</Button>
        )}
      </Box>
    );
  }
}

export default inject((store: IStore) => store)(observer(Header));
