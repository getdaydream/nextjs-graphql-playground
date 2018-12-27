import { Post, PostType } from '@/store/post/interface';
import { ReduxStore } from '@/store/store';
import React from 'react';
import { connect } from 'react-redux';
// import SnippetEdit from './SnippetEdit';

interface Props {
  post: Post;
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

export default connect((state: ReduxStore.state) => ({
  // post: state.post.currentPost,
}))(PostView);
