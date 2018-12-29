import { Provider } from 'mobx-react';
import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import './assets/scss/global.scss';
import { getRoutes } from './pages/routes';
import store from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider {...store}>
        <HashRouter>{getRoutes()}</HashRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
