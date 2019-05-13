import { Epic } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';

// placeholder
export const fetchNoopEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = actions$ => actions$.pipe();
