import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { MstStoreProps } from '@/stores';
import { Button, Avatar } from 'antd';
import dynamic from 'next/dynamic';

const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
  ssr: false,
});

class Header extends React.Component<MstStoreProps> {
  openPost = () => {
    const { initArticleEdit } = this.props.store;
    initArticleEdit();
  };

  render() {
    const {
      account: { user },
      globalHeader: { showAuthModal, setShowAuthModal },
      articleEdit,
    } = this.props.store;

    return (
      <Box direction="row" pad="small" style={{ background: 'white' }}>
        {showAuthModal && <AuthModal />}

        {user ? (
          <Box direction="row" justify="between" fill>
            <div />
            <Box direction="row" justify="end" align="center">
              <Button onClick={this.openPost}>Post</Button>
              <Avatar />
            </Box>
          </Box>
        ) : (
          <Button onClick={() => setShowAuthModal(true)}>登录</Button>
        )}

        {articleEdit && <ArticleEdit />}
      </Box>
    );
  }
}

export default inject(store => store)(observer(Header));
