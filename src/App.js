import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Counter from './page/counter';

class App extends Component {
  render() {
    return (
      <div>
        <Counter />
      </div>
    );
  }
}

export default hot(module)(App);
