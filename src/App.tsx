import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getRoutes } from './pages/routes';

class App extends React.Component {
  public render() {
    return <BrowserRouter>{getRoutes()}</BrowserRouter>;
  }
}

export default App;
