import { Post, PostType } from '@/store/post.interface';
import { Spinner } from '@blueprintjs/core';
import { inject } from 'mobx-react';
import React from 'react';
// import SnippetEdit from './SnippetEdit';

interface InjectProps {
  post: Post;
}

interface OwnProps {
  className?: string;
}

class PostDetail extends React.Component<OwnProps & InjectProps> {
  public renderContent = () => {
    const { post } = this.props;
    if (!post) {
      return <Spinner size={24} />;
    }
    console.log(post);
    if (post.type === PostType.snippet) {
      return <div />;
    }
    return null;
  };

  public render() {
    const { className } = this.props;
    return <div className={className}>{this.renderContent()}</div>;
  }
}

export default inject(store => ({
  post: store.post.currentPost,
}))(PostDetail);
