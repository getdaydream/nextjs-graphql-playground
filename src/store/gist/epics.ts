import { genApiPath } from '@/utils/tools';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { GistAction } from '.';
import { newGist, updateGist } from './actions';

const epicNewGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isActionOf(newGist.request)),
    mergeMap(action =>
      ajax
        .post(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newGist.success(ajaxResp.response))),
    ),
  );

const epicUpdateGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isActionOf(updateGist.request)),
    mergeMap(action =>
      ajax
        .put(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newGist.success(ajaxResp.response))),
    ),
  );

export default combineEpics(epicNewGist, epicUpdateGist);
