import React from 'react';
import Header from '@/containers/Headers';
import { NextFC } from 'next';

const Home: NextFC = () => {
  return (
    <div>
      <Header />

      <div>test apollo client</div>
    </div>
  );
};

export default Home;
