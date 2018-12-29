import { IPost } from '@/store/post/interface';
import { Classes } from '@blueprintjs/core';
import c from 'classnames';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './index.module.scss';
// import PostView from './PostView';
import Sidebar from './Sidebar';
// import SidebarSecondary from './SidebarSecondary';

interface Props extends RouteComponentProps<{}> {
  currentPost: IPost;
  onFetchPostList: () => void;
}

class PostHome extends React.Component<Props> {
  public componentDidMount() {
    const { onFetchPostList } = this.props;
    onFetchPostList();
  }

  public render() {
    return (
      <div className={c(styles.root, Classes.DARK)}>
        <Sidebar className={styles.sidebar} />
        {/* <SidebarSecondary className={styles.sidebarSecondary} /> */}

        {/* <main className={styles.main}>
    <PostView />
  </main> */}
      </div>
    );
  }
}

export default PostHome;
