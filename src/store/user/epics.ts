import axios from '@/utils/axios';
import { combineEpics, Epic } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { login } from './actions';
import { UserAction } from './reducer';

const userLogin: Epic<UserAction> = action$ =>
  action$.pipe(
    filter(isActionOf(login.request)),
    mergeMap(action =>
      from(axios.post('/api/users/login', action.payload)).pipe(
        map(resp => login.success(resp.data)),
      ),
    ),
  );

export default combineEpics(userLogin);
