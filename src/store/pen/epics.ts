import { genApiPath } from '@/utils/tools';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { PenAction } from '.';
import { newPen, updatePen } from './actions';

const epicNewPen: Epic<PenAction> = action$ =>
  action$.pipe(
    filter(isActionOf(newPen.request)),
    mergeMap(action =>
      ajax
        .post(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newPen.success(ajaxResp.response))),
    ),
  );

const epicUpdatePen: Epic<PenAction> = action$ =>
  action$.pipe(
    filter(isActionOf(updatePen.request)),
    mergeMap(action =>
      ajax
        .put(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newPen.success(ajaxResp.response))),
    ),
  );

export default combineEpics(epicNewPen, epicUpdatePen);
