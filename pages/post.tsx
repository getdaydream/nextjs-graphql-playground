import React from 'react';
import dynamic from 'next/dynamic';

const BraftEditor = dynamic(() => import('@/components/BraftEditor'), {
  ssr: false,
});

class Post extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ background: 'white' }}>
        <BraftEditor />
      </div>
    );
  }
}

export default Post;
