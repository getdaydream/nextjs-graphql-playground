import { Epic } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';

export const fetchUserEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe();
