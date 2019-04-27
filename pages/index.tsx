import React from 'react';
import Link from 'next/link';
import Header from '@/containers/Headers';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div>test apollo client</div>

        <Link href="/user">
          <a>user</a>
        </Link>
      </div>
    );
  }
}

export default Home;
