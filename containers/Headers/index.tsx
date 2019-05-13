import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
// import { observer, inject } from 'mobx-react';
// import { MstStoreProps } from '@/stores';
// import { Button, Avatar } from 'antd';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { setGlobalOverlay as setGlobalOverlayAction } from '@/store/UI/global/actions';
// import dynamic from 'next/dynamic';

// const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
//   ssr: false,
// });

const mapStateToProps = (state: RootState) => ({
  showAuthModal: state.global.globalOverlay === 'auth',
});

const dispatchProps = {
  setGlobalOverlay: setGlobalOverlayAction,
};

type HeaderProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const Header: React.FC<HeaderProps> = ({ showAuthModal, setGlobalOverlay }) => {
  return (
    <Box direction="row" pad="small" style={{ background: 'white' }}>
      {showAuthModal && <AuthModal />}

      {/* {user ? (
        <Box direction="row" justify="between" fill>
          <div />
          <Box direction="row" justify="end" align="center">
            <Button onClick={this.openPost}>Post</Button>
            <Avatar />
          </Box>
        </Box>
      ) : (
        <Button onClick={() => setShowAuthModal(true)}>登录</Button>
      )} */}

      <button onClick={() => setGlobalOverlay('auth')}>登录</button>

      {/* {articleEdit && <ArticleEdit />} */}
    </Box>
  );
};

export default connect(
  mapStateToProps,
  dispatchProps,
)(Header);
