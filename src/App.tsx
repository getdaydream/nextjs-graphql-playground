import React from 'react';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import './assets/scss/global.scss';
import { getRoutes } from './pages/routes';
import store from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>{getRoutes()}</HashRouter>
      </Provider>
    );
  }
}

export default App;
