import { Post } from '@/store/post.interface';
import { Classes } from '@blueprintjs/core';
import c from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import Catalog from './Catalog';
import styles from './index.module.scss';
import PostDetail from './PostDetail';
import Sidebar from './Sidebar';

interface Props extends RouteComponentProps<{}> {
  currentPost: Post;
  onFetchPostList: () => Promise<void>;
}

@observer
class PostHome extends React.Component<Props> {
  public componentDidMount() {
    const { onFetchPostList } = this.props;
    onFetchPostList();
  }

  public render() {
    return (
      <div className={c(styles.root, Classes.DARK)}>
        <Sidebar className={styles.sidebar} />
        <Catalog className={styles.catalog} />
        <PostDetail className={styles.postDetail} />
      </div>
    );
  }
}

export default inject(store => ({
  onFetchPostList: store.post.fetchPostsByFolderId,
}))(PostHome);
