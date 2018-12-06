import { combineEpics } from 'redux-observable';
import gistEpic from './gist/epics';
import userEpic from './user/epics';

export default combineEpics(userEpic, gistEpic);
