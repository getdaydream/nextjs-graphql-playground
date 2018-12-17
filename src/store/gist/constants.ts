/**
 * 异步 action type
 */

// 创建 gist
export const NEW_GIST_REQUEST = '@@gist/NEW_GIST_REQUEST';
export const NEW_GIST_SUCCESS = '@@gist/NEW_GIST_SUCCESS';
export const NEW_GIST_ERROR = '@@gist/NEW_GIST_ERROR';

// 修改 gist
export const UPDATE_GIST_REQUEST = '@@gist/UPDATE_GIST_REQUEST';
export const UPDATE_GIST_SUCCESS = '@@gist/UPDATE_GIST_SUCCESS';
export const UPDATE_GIST_ERROR = '@@gist/UPDATE_GIST_ERROR';

// 请求 gist list
export const FETCH_GIST_LIST_REQUEST = '@@gist/FETCH_GIST_LIST_REQUEST';
export const FETCH_GIST_LIST_SUCCESS = '@@gist/FETCH_GIST_LIST_SUCCESS';
export const FETCH_GIST_LIST_ERROR = '@@gist/FETCH_GIST_LIST_ERROR';

// 删除 gist list
export const DELETE_GIST_REQUEST = '@@gist/DELETE_GIST_REQUEST';
export const DELETE_GIST_SUCCESS = '@@gist/DELETE_GIST_SUCCESS';

/**
 * 同步 action type
 */
export const RESET_CURRENT_GIST = '@@gist/RESET_CURRENT_GIST';
export const UPDATE_CURRENT_GIST = '@@gist/UPDATE_CURRENT_GIST';
export const ADD_FILE_TO_CURRENT_GIST = '@@gist/ADD_FILE_TO_CURRENT_GIST';
export const UPDATE_IS_EDITING = '@@gist/UPDATE_IS_EDITING';
