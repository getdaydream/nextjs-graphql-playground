// import { Post, PostType } from '@/store/post.interface';
// import { Spinner } from '@blueprintjs/core';
import { Post } from '@/store/post.interface';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Snippet from './Snippet';

interface InjectProps {
  post: Post | undefined;
}

interface OwnProps {
  className?: string;
}

@observer
class PostDetail extends React.Component<OwnProps & InjectProps> {
  public render() {
    const { className, post } = this.props;

    if (!post) {
      return null;
    }

    return (
      <div className={className}>
        <Snippet />
      </div>
    );
  }
}

export default inject(store => ({
  post: store.post.currentPost,
}))(PostDetail);
