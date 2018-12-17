import axios from '@/utils/axios';
import { combineEpics, Epic } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { GistAction } from '.';
import {
  deleteGistSuccessAction,
  fetchGistListSuccessAction,
  newGistSuccessAction,
  updateGistSuccessAction,
} from './actions';
import {
  DELETE_GIST_REQUEST,
  FETCH_GIST_LIST_REQUEST,
  NEW_GIST_REQUEST,
  UPDATE_GIST_REQUEST,
} from './constants';

const epicNewGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(NEW_GIST_REQUEST)),
    mergeMap(action =>
      from(axios.post('/gists', action.payload)).pipe(
        map(resp => newGistSuccessAction(resp.data)),
      ),
    ),
  );

const epicUpdateGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(UPDATE_GIST_REQUEST)),
    mergeMap(action =>
      from(axios.put('/gists', action.payload)).pipe(
        map(resp => updateGistSuccessAction(resp.data.data)),
      ),
    ),
  );

const epicFetchGistList: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(FETCH_GIST_LIST_REQUEST)),
    mergeMap(action =>
      from(axios.get('/gists')).pipe(
        map(resp => fetchGistListSuccessAction(resp.data)),
      ),
    ),
  );

const epicDeleteGist: Epic<GistAction> = action$ =>
  action$.pipe(
    filter(isOfType(DELETE_GIST_REQUEST)),
    mergeMap(action =>
      from(axios.delete(`/gists/${action.payload}`)).pipe(
        map(resp => deleteGistSuccessAction(resp.data.id)),
      ),
    ),
  );

export default combineEpics(
  epicNewGist,
  epicUpdateGist,
  epicFetchGistList,
  epicDeleteGist,
);
