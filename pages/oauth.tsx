import React from 'react';
import { NextContext } from 'next';

class Oauth extends React.Component {
  static async getInitialProps({ query }: NextContext) {
    const { code } = query
    if (code) {

    }
  }

  handleClickGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=f56fd54bf938e93a6166
    `;
  };

  render() {
    return <button onClick={this.handleClickGithubLogin}>Github login</button>;
  }
}

export default Oauth;
