import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import { RootState, RootAction } from 'typesafe-actions';

export default function configureStore(
  initialState: RootState,
): Store<RootState> {
  // create middlewares
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
  >();

  // create store
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );

  // start middlewares
  epicMiddleware.run(rootEpic);

  return store;
}
