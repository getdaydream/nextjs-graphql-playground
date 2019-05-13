import { combineReducers } from 'redux';
import { UIGlobalReducer } from './UI/global';

export default combineReducers({
  global: UIGlobalReducer,
});
