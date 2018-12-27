import { ReduxStore } from '@/store/store';
import c from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import PostListItem from '../PostListItem';
import styles from './index.module.scss';

interface Props {
  postIds: number[];
  className?: string;
}

class SidebarSecondary extends React.Component<Props> {
  public render() {
    const { className, postIds } = this.props;

    return (
      <div className={c(className, styles.root)}>
        {postIds.map(id => (
          <PostListItem key={id} id={id} />
        ))}
      </div>
    );
  }
}

export default connect((state: ReduxStore.state) => ({
  postIds: state.post.postIds,
}))(SidebarSecondary);
