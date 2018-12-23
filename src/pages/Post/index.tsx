import PostListItem from '@/components/PostListItem';
import { postActions } from '@/store/post';
import { Post } from '@/store/post/interface';
import { ReduxStore } from '@/store/store';
import { Button, Classes, Intent, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import GistEdit from './GistEdit';
import styles from './index.module.scss';

interface Props extends RouteComponentProps<{}> {
  currentPost: Post;
  postList: Post[];
  onDeletePost: (id: number) => void;
  onFetchPostList: () => void;
  onClickNewPost: () => void;
  onChangeCurrent: (post: Post) => void;
}

class PostHome extends React.Component<Props> {
  public componentDidMount() {
    const { onFetchPostList } = this.props;
    onFetchPostList();
  }

  public handleClickNewPost = async () => {
    const { onClickNewPost } = this.props;
    onClickNewPost();
  };

  public handleClickPostItem = () => {
    // TODO:
  };

  public renderSidebar = () => {
    const { postList, onDeletePost, currentPost } = this.props;

    return (
      <div className={styles.sidebar}>
        <Button
          text="New Post"
          intent={Intent.PRIMARY}
          fill={true}
          onClick={this.handleClickNewPost}
        />
        {postList.length > 0 &&
          postList.map(post => (
            <PostListItem
              active={currentPost.id === post.id}
              key={post.id}
              onDelete={() => onDeletePost(post.id)}
              onClick={this.handleClickPostItem}
              {...post}
            />
          ))}
      </div>
    );
  };

  public renderMainContent = () => {
    return <GistEdit />;
  };

  public render() {
    return (
      <Fragment>
        <Navbar fixedToTop={true} className={Classes.DARK} />

        {this.renderSidebar()}

        <main className={styles.main}>{this.renderMainContent()}</main>
      </Fragment>
    );
  }
}

export default connect(
  (state: ReduxStore.state) => ({
    currentPost: state.post.currentPost,
    postList: state.post.postList,
  }),
  {
    onClickNewPost: postActions.resetCurrnetEditPostAction,
    onDeletePost: postActions.deletePostRequestAction,
    onFetchPostList: postActions.fetchPostListRequestAction,
  },
)(PostHome);
