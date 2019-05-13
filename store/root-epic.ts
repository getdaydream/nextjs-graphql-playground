import { combineEpics } from 'redux-observable';
import { UIGlobalEpics } from './UI/global';

export default combineEpics(...Object.values(UIGlobalEpics));
