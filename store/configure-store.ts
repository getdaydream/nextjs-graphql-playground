import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { AppState } from './app-state';
import { rootReducer } from './root-reducer';
import { rootEpic } from './root-epic';

export default function configureStore(
  initialState: AppState,
): Store<AppState> {
  // create middlewares
  const epicMiddleware = createEpicMiddleware();

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
