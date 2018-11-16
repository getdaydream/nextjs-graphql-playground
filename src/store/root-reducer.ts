import { combineReducers } from 'redux';
import { counterReducer } from './counter';
import { userReducer } from './user';

const rootReducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default rootReducers;
