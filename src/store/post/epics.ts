import axios from '@/utils/axios';
import { combineEpics, Epic } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { PostAction } from '.';
import {
  deletePostSuccessAction,
  fetchPostListSuccessAction,
  newPostSuccessAction,
  updatePostSuccessAction,
} from './actions';
import {
  DELETE_POST_REQUEST,
  FETCH_POST_LIST_REQUEST,
  NEW_POST_REQUEST,
  UPDATE_POST_REQUEST,
} from './constants';

const epicNewPost: Epic<PostAction> = action$ =>
  action$.pipe(
    filter(isOfType(NEW_POST_REQUEST)),
    mergeMap(action =>
      from(axios.post('/posts', action.payload)).pipe(
        map(resp => newPostSuccessAction(resp.data)),
      ),
    ),
  );

const epicUpdatePost: Epic<PostAction> = action$ =>
  action$.pipe(
    filter(isOfType(UPDATE_POST_REQUEST)),
    mergeMap(action =>
      from(axios.put('/posts', action.payload)).pipe(
        map(resp => updatePostSuccessAction(resp.data.data)),
      ),
    ),
  );

const epicFetchPostList: Epic<PostAction> = action$ =>
  action$.pipe(
    filter(isOfType(FETCH_POST_LIST_REQUEST)),
    mergeMap(action =>
      from(axios.get('/posts')).pipe(
        map(resp => fetchPostListSuccessAction(resp.data)),
      ),
    ),
  );

const epicDeletePost: Epic<PostAction> = action$ =>
  action$.pipe(
    filter(isOfType(DELETE_POST_REQUEST)),
    mergeMap(action =>
      from(axios.delete(`/posts/${action.payload}`)).pipe(
        map(resp => deletePostSuccessAction(resp.data.id)),
      ),
    ),
  );

export default combineEpics(
  epicNewPost,
  epicUpdatePost,
  epicFetchPostList,
  epicDeletePost,
);
