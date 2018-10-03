import React from 'react';
import { HashRouter } from 'react-router-dom';

import '../assets/scss/global.scss';
import { getRoutes } from './pages/routes';

class App extends React.Component {
  public render() {
    return <HashRouter>{getRoutes()}</HashRouter>;
  }
}

export default App;
