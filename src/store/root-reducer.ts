import { combineReducers } from 'redux';
import { counterReducer } from './counter';
import { gistReducer } from './gist';
import { userReducer } from './user';

const rootReducers = combineReducers({
  counter: counterReducer,
  gist: gistReducer,
  user: userReducer,
});

export default rootReducers;
