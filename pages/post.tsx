import React from 'react';
import { NextFC } from 'next';
import Header from '@/containers/Headers';

const Post: NextFC = () => {
  return (
    <div style={{ background: 'white' }}>
      <Header />
    </div>
  );
};

export default Post;
