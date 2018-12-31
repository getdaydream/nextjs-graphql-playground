import { Post } from '@/store/post.interface';
import { Intent, Spinner } from '@blueprintjs/core';
import { inject } from 'mobx-react';
import React from 'react';
import styles from './PostList.module.scss';

interface InjectProps {
  posts: Post[];
  onChangeCurrentPostId: (id: number) => Promise<void>;
}

class PostList extends React.Component<InjectProps> {
  public render() {
    const { posts, onChangeCurrentPostId } = this.props;

    if (posts) {
      return posts.map(post => (
        <div
          key={post.id}
          className={styles.item}
          onClick={() => onChangeCurrentPostId(post.id)}
        >
          <div>{post.type}</div>
          <div>{post.title}</div>
        </div>
      ));
    }
    return <Spinner intent={Intent.NONE} size={24} />;
  }
}

export default inject(store => ({
  onChangeCurrentPostId: store.post.changeCurrentPostId,
  posts: store.post.currentPosts,
}))(PostList);
