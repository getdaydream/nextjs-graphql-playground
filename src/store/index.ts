import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducers from './root-reducer';

const configureStore = (initialState?: object) => {
  return createStore(rootReducers, initialState!, applyMiddleware(logger));
};

const store = configureStore();

export default store;
