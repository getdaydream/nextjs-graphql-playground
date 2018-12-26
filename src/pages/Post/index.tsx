import { postActions } from '@/store/post';
import { Post } from '@/store/post/interface';
import { ReduxStore } from '@/store/store';
import { Classes } from '@blueprintjs/core';
import c from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import GistEdit from './GistEdit';
import styles from './index.module.scss';
import Sidebar from './Sidebar';
import SidebarSecondary from './SidebarSecondary';

interface Props extends RouteComponentProps<{}> {
  currentPost: Post;
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

  // public renderSidebar = () => {
  //   const { postList, onDeletePost, currentPost } = this.props;

  //   return (
  //     <div className={styles.sidebar}>
  //       <Button
  //         text="New Post"
  //         intent={Intent.PRIMARY}
  //         fill={true}
  //         onClick={this.handleClickNewPost}
  //       />
  //       {postList.length > 0 &&
  //         postList.map(post => (
  //           <PostListItem
  //             active={currentPost.id === post.id}
  //             key={post.id}
  //             onDelete={() => onDeletePost(post.id)}
  //             onClick={this.handleClickPostItem}
  //             {...post}
  //           />
  //         ))}
  //     </div>
  //   );
  // };

  public renderMainContent = () => {
    return <GistEdit />;
  };

  public render() {
    return (
      <div className={c(styles.root, Classes.DARK)}>
        <Sidebar className={styles.sidebar} />
        <SidebarSecondary className={styles.sidebarSecondary} />

        <main className={styles.main}>{this.renderMainContent()}</main>
      </div>
    );
  }
}

export default connect(
  (state: ReduxStore.state) => ({
    currentPost: state.post.currentPost,
  }),
  {
    onClickNewPost: postActions.resetCurrnetEditPostAction,
    onDeletePost: postActions.deletePostRequestAction,
    onFetchPostList: postActions.fetchPostListRequestAction,
  },
)(PostHome);
