import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { userActions } from '../user';
import { fetchTodos } from './actions';
import { UserAction } from './reducer';

const userLogin: Epic<UserAction> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchTodos.request)),
    mergeMap(action =>
      ajax
        .post('http://127.0.0.1:3000/api/auth/login', action.payload)
        .pipe(map(response => userActions.loginSuccess(response as any))),
    ),
  );

export default combineEpics(userLogin);
