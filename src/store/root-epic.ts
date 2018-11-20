import { combineEpics } from 'redux-observable';
import penEpic from './pen/epics';
import userEpic from './user/epics';

export default combineEpics(userEpic, penEpic);
