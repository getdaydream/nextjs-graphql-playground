import React from 'react';

class User extends React.Component {
  static async getInitialProps() {
    console.log('user getInitialProps');
  }

  render() {
    return <div>user</div>;
  }
}

export default User;
