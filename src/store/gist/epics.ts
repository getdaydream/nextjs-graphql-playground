import { genApiPath } from '@/utils/tools';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { PenAction } from '.';
import { newGist, updateGist } from './actions';

const epicNewPen: Epic<PenAction> = action$ =>
  action$.pipe(
    filter(isActionOf(newGist.request)),
    mergeMap(action =>
      ajax
        .post(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newGist.success(ajaxResp.response))),
    ),
  );

const epicUpdatePen: Epic<PenAction> = action$ =>
  action$.pipe(
    filter(isActionOf(updateGist.request)),
    mergeMap(action =>
      ajax
        .put(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newGist.success(ajaxResp.response))),
    ),
  );

export default combineEpics(epicNewPen, epicUpdatePen);
