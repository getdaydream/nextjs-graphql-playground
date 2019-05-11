import { combineReducers } from 'redux';
import { AccountReducer } from './shared/account';

const rootReducer = combineReducers({
  account: AccountReducer,
});

export default rootReducer;
