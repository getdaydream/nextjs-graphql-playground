import { combineReducers } from 'redux';
import { counterReducer } from './counter';
import { postReducer } from './post';
import { userReducer } from './user';

const rootReducers = combineReducers({
  counter: counterReducer,
  post: postReducer,
  user: userReducer,
});

export default rootReducers;
