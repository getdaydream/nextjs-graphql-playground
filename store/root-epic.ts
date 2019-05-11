import { combineEpics } from 'redux-observable';
import { AccountEpics } from './shared/account';

const rootEpic = combineEpics(...Object.values(AccountEpics));

export default rootEpic;
