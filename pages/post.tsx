import React from 'react';
import dynamic from 'next/dynamic';

const BraftEditor = dynamic(() => import('braft-editor'), {
  ssr: false,
});

class Post extends React.Component {
  componentDidMount() {
    import('braft-editor/dist/index.css');
  }

  render() {
    return (
      <div style={{ background: 'white' }}>
        <BraftEditor />
      </div>
    );
  }
}

export default Post;
