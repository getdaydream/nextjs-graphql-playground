import axios from '@/utils/axios';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './root-epic';
import rootReducers from './root-reducer';

const epicMiddleware = createEpicMiddleware({
  dependencies: { ajax: axios },
});

const configureStore = (initialState?: object) => {
  const middlewares = [epicMiddleware, logger];
  const store = createStore(
    rootReducers,
    initialState!,
    applyMiddleware(...middlewares),
  );
  // You might need to call this multiple times if your app implements code splitting and you want to load some of the epics dynamically or you're using hot reloading.
  epicMiddleware.run(rootEpic);
  return store;
};

const reduxStore = configureStore();

export default reduxStore;
