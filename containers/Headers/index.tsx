import React from 'react';
import AuthModal from '../AuthModal';
import { Box } from 'grommet';
import { RootState } from 'typesafe-actions';
import { connect } from 'react-redux';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { Query } from 'react-apollo';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';
import dynamic from 'next/dynamic';
import { Button, Intent } from '@blueprintjs/core';
import Avatar from '@/components/Avatar';

const ArticleEdit = dynamic(() => import('@/containers/ArticleEdit'), {
  ssr: false,
});

const mapStateToProps = (state: RootState) => ({
  showAuthModal: state.global.overlay === 'auth',
  showPostOverlay: state.global.overlay === 'post',
});

const dispatchProps = {
  setGlobalOverlay,
};

type HeaderProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const Header: React.FC<HeaderProps> = ({
  showAuthModal,
  showPostOverlay,
  setGlobalOverlay,
}) => {
  return (
    <Box direction="row" pad="small" style={{ background: 'white' }}>
      {showAuthModal && <AuthModal />}
      {showPostOverlay && <ArticleEdit />}

      <Query<IQueryMe> query={QueryMe}>
        {({ data }) => {
          if (data && data.me) {
            return (
              <Box direction="row" justify="between" fill>
                <div />
                <Box direction="row" justify="end" align="center">
                  <Button
                    onClick={() => setGlobalOverlay('post')}
                    large
                    intent={Intent.PRIMARY}
                  >
                    Post
                  </Button>
                  <Avatar />
                </Box>
              </Box>
            );
          }
          return <Button onClick={() => setGlobalOverlay('auth')}>登录</Button>;
        }}
      </Query>
    </Box>
  );
};

export default connect(
  mapStateToProps,
  dispatchProps,
)(Header);
