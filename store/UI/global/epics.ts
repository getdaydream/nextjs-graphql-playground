import { Epic } from 'redux-observable';
import { RootAction, RootState, isActionOf } from 'typesafe-actions';
import { filter } from 'rxjs/operators';
import { noop } from './actions';

// placeholder
export const fetchNoopEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = actions$ => actions$.pipe(filter(isActionOf(noop)));
