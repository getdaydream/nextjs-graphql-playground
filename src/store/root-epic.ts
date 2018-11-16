import { combineEpics } from 'redux-observable';
import userEpic from './user/epics';

export default combineEpics(userEpic);
