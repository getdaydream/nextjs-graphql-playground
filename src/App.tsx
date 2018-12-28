import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'unstated';
import './assets/scss/global.scss';
import { PostEntityContainer } from './containers';
import { getRoutes } from './pages/routes';
import store from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider inject={[new PostEntityContainer()]}>
        <ReduxProvider store={store}>
          <HashRouter>{getRoutes()}</HashRouter>
        </ReduxProvider>
      </Provider>
    );
  }
}

export default hot(module)(App);
