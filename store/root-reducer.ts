import { combineReducers } from 'redux';
import * as Account from './feature/account';

const rootReducer = combineReducers({
  account: Account.reducer,
});

export default rootReducer;
