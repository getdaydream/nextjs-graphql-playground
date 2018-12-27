import { combineReducers } from 'redux';
import { postReducer } from './post';
import { userReducer } from './user';

const rootReducers = combineReducers({
  post: postReducer,
  user: userReducer,
});

export default rootReducers;
