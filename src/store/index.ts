import { createStore } from 'redux';
import rootReducers from './root-reducer';

const configureStore = (initialState?: object) => {
  return createStore(
    rootReducers,
    initialState!,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

const store = configureStore();

export default store;
