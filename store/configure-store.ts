import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';

export default (initialState?: any) => {
  // create middlewares
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
  >();

  // create store
  const store = createStore(
    rootReducer,
    initialState || {},
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );

  // start middlewares
  epicMiddleware.run(rootEpic);

  return store;
};
