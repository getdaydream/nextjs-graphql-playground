import { action } from 'typesafe-actions';
import {
  ADD_FILE_TO_CURRENT_POST,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  FETCH_POST_LIST_REQUEST,
  FETCH_POST_LIST_SUCCESS,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  RESET_CURRENT_POST,
  UPDATE_CURRENT_POST,
  UPDATE_IS_EDITING,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from './constants';
import { Post } from './reducer';

/**
 * async action
 */
// create post
export const newPostRequestAction = (post: Partial<Post>) =>
  action(NEW_POST_REQUEST, post);
export const newPostSuccessAction = (post: Partial<Post>) =>
  action(NEW_POST_SUCCESS, post);

// update post
export const updatePostRequestAction = (post: Partial<Post>) =>
  action(UPDATE_POST_REQUEST, post);
export const updatePostSuccessAction = (post: Partial<Post>) =>
  action(UPDATE_POST_SUCCESS, post);

// fetch post list
export const fetchPostListRequestAction = () => action(FETCH_POST_LIST_REQUEST);
export const fetchPostListSuccessAction = (posttList: Post[]) =>
  action(FETCH_POST_LIST_SUCCESS, posttList);

// delete post
export const deletePostRequestAction = (id: number) =>
  action(DELETE_POST_REQUEST, id);
export const deletePostSuccessAction = (id: number) =>
  action(DELETE_POST_SUCCESS, id);

/**
 * sync action
 */
export const resetCurrnetEditPostAction = () => action(RESET_CURRENT_POST);

export const updateCurrentEditPostAction = (post: Partial<Post>) =>
  action(UPDATE_CURRENT_POST, post);

export const addFileToCurrentEditGistAction = () =>
  action(ADD_FILE_TO_CURRENT_POST);

export const updateIsEditing = (isEditing: boolean) =>
  action(UPDATE_IS_EDITING, isEditing);
