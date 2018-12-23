/**
 * async action type
 */

// create post
export const NEW_POST_REQUEST = '@@post/NEW_POST_REQUEST';
export const NEW_POST_SUCCESS = '@@post/NEW_POST_SUCCESS';
export const NEW_POST_ERROR = '@@post/NEW_POST_ERROR';

// delete post
export const UPDATE_POST_REQUEST = '@@post/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = '@@post/UPDATE_POST_SUCCESS';
export const UPDATE_POST_ERROR = '@@post/UPDATE_POST_ERROR';

// fetch post list
export const FETCH_POST_LIST_REQUEST = '@@post/FETCH_POST_LIST_REQUEST';
export const FETCH_POST_LIST_SUCCESS = '@@post/FETCH_POST_LIST_SUCCESS';
export const FETCH_POST_LIST_ERROR = '@@post/FETCH_POST_LIST_ERROR';

// delete post list
export const DELETE_POST_REQUEST = '@@post/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = '@@post/DELETE_POST_SUCCESS';

/**
 * sync action type
 */
export const RESET_CURRENT_POST = '@@post/RESET_CURRENT_POST';
export const UPDATE_CURRENT_POST = '@@post/UPDATE_CURRENT_POST';
export const ADD_FILE_TO_CURRENT_POST = '@@post/ADD_FILE_TO_CURRENT_POST';
export const UPDATE_IS_EDITING = '@@post/UPDATE_IS_EDITING';
