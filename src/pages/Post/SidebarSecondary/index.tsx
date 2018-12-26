import { Post } from '@/store/post/interface';
import { ReduxStore } from '@/store/store';
import c from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import PostListItem from '../PostListItem';
import styles from './index.module.scss';

interface Props {
  postList: Post[];
  className?: string;
}

class SidebarSecondary extends React.Component<Props> {
  public render() {
    const { className, postList } = this.props;

    return (
      <div className={c(className, styles.root)}>
        {postList.map(post => (
          <PostListItem {...post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default connect((state: ReduxStore.state) => ({
  postList: state.post.postList,
}))(SidebarSecondary);
