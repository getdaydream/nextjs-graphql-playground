import { IPost, PostType } from '@/store/post/interface';
import React from 'react';
// import SnippetEdit from './SnippetEdit';

interface Props {
  post: IPost;
}

class PostView extends React.Component<Props> {
  public render() {
    const { post } = this.props;
    if (post.type === PostType.snippet) {
      // return <SnippetEdit />;
    }
    return null;
  }
}

export default PostView
