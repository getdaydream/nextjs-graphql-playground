import { combineReducers } from 'redux';
import * as Account from './module/account';

export const rootReducer = combineReducers({
  account: Account.reducer,
});
