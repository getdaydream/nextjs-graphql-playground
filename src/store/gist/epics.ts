import { genApiPath } from '@/utils/tools';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { GistAction } from '.';
import { newGistSuccessAction, updateGistSuccessAction } from './actions';
import { NEW_GIST_REQUEST, UPDATE_GIST_REQUEST } from './constants';

const epicNewGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(NEW_GIST_REQUEST)),
    mergeMap(action =>
      ajax
        .post(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => newGistSuccessAction(ajaxResp.response))),
    ),
  );

const epicUpdateGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(UPDATE_GIST_REQUEST)),
    mergeMap(action =>
      ajax
        .put(genApiPath('/api/cheatsheet'), action.payload)
        .pipe(map(ajaxResp => updateGistSuccessAction(ajaxResp.response))),
    ),
  );

export default combineEpics(epicNewGist, epicUpdateGist);
