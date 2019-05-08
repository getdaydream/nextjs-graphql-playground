import { combineEpics } from 'redux-observable';
import { epics } from './feature/account';

const rootEpic = combineEpics(epics);

export default rootEpic;
