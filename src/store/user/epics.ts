import { genApiPath } from '@/utils/tools';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { login } from './actions';
import { UserAction } from './reducer';

const userLogin: Epic<UserAction> = action$ =>
  action$.pipe(
    filter(isActionOf(login.request)),
    mergeMap(action =>
      ajax({
        body: action.payload,
        crossDomain: true,
        method: 'post',
        url: genApiPath('/api/users/login'),
        withCredentials: true,
      }).pipe(map(ajaxResp => login.success(ajaxResp.response))),
    ),
  );

export default combineEpics(userLogin);
