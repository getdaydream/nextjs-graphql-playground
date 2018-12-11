import { action } from 'typesafe-actions';
import {
  ADD_FILE_TO_CURRENT_EDIT_GIST,
  NEW_GIST_REQUEST,
  NEW_GIST_SUCCESS,
  UPDATE_CURRENT_EDIT_GIST,
  UPDATE_GIST_REQUEST,
  UPDATE_GIST_SUCCESS,
} from './constants';
import { Gist } from './reducer';

/**
 * 异步 action
 */
// 新建gist
export const newGistRequestAction = (gist: Partial<Gist>) =>
  action(NEW_GIST_REQUEST, gist);
export const newGistSuccessAction = (gist: Partial<Gist>) =>
  action(NEW_GIST_SUCCESS, gist);

// 更新gist
export const updateGistRequestAction = (gist: Partial<Gist>) =>
  action(UPDATE_GIST_REQUEST, gist);
export const updateGistSuccessAction = (gist: Partial<Gist>) =>
  action(UPDATE_GIST_SUCCESS, gist);

/**
 * 同步 action
 */
export const updateCurrentEditGistAction = (gist: Partial<Gist>) =>
  action(UPDATE_CURRENT_EDIT_GIST, gist);

export const addFileToCurrentEditGistAction = () =>
  action(ADD_FILE_TO_CURRENT_EDIT_GIST);
