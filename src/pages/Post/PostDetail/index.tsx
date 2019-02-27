// import { Post, PostType } from '@/store/post.interface';
// import { Spinner } from '@blueprintjs/core';
import { Post, PostType } from '@/store/post.interface';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Article from './Article';
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
        {post.type === PostType.snippet && <Snippet />}
        {post.type === PostType.markdown && <Article />}
      </div>
    );
  }
}

export default inject(store => ({
  post: store.post.currentPost,
}))(PostDetail);
