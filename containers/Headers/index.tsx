import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { Button, Avatar } from 'antd';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { Query } from 'react-apollo';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';
// import dynamic from 'next/dynamic';

// const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
//   ssr: false,
// });

const mapStateToProps = (state: RootState) => ({
  showAuthModal: state.global.overlay === 'auth',
});

const dispatchProps = {
  setGlobalOverlay,
};

type HeaderProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const Header: React.FC<HeaderProps> = ({ showAuthModal, setGlobalOverlay }) => {
  return (
    <Box direction="row" pad="small" style={{ background: 'white' }}>
      {showAuthModal && <AuthModal />}

      <Query<IQueryMe> query={QueryMe}>
        {({ data }) => {
          if (data && data.me) {
            return (
              <Box direction="row" justify="between" fill>
                <div />
                <Box direction="row" justify="end" align="center">
                  <Button>Post</Button>
                  <Avatar />
                </Box>
              </Box>
            );
          }

          return <Button onClick={() => setGlobalOverlay('auth')}>登录</Button>;
        }}
      </Query>

      {/* {articleEdit && <ArticleEdit />} */}
    </Box>
  );
};

export default connect(
  mapStateToProps,
  dispatchProps,
)(Header);
