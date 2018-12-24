// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  ADD_FILE_TO_CURRENT_POST,
  DELETE_POST_SUCCESS,
  FETCH_POST_LIST_SUCCESS,
  NEW_POST_SUCCESS,
  RESET_CURRENT_POST,
  UPDATE_CURRENT_POST,
  UPDATE_IS_EDITING,
} from './constants';
import { Post, PostFile, PostState, PostType } from './interface';

export type PostAction = ActionType<typeof actions>;

const getDefaultPostFile = () =>
  ({
    content: '',
    filename: 'index',
    filetype: 'typescript',
  } as PostFile);

const getDefaultEditPost = () =>
  ({
    description: '',
    files: [getDefaultPostFile()],
    folder: 'Default',
    isPrivate: false,
    title: '',
    type: PostType.snippet,
  } as Post);

const postReducer = combineReducers<PostState, PostAction>({
  currentPost: (state = getDefaultEditPost() as Post, action) => {
    switch (action.type) {
      case RESET_CURRENT_POST:
        return getDefaultEditPost();
      case UPDATE_CURRENT_POST:
        return {
          ...state,
          ...action.payload,
        };
      case ADD_FILE_TO_CURRENT_POST:
        return {
          ...state,
          files: state.files.concat([getDefaultPostFile()]),
        };
      default:
        return state;
    }
  },
  isEditing: (state = false, action) => {
    switch (action.type) {
      case UPDATE_IS_EDITING:
        return action.payload;
      default:
        return state;
    }
  },
  postList: (state = [] as Post[], action) => {
    switch (action.type) {
      case NEW_POST_SUCCESS:
        return state.concat([action.payload as Post]);
      case FETCH_POST_LIST_SUCCESS:
        return action.payload;
      case DELETE_POST_SUCCESS:
        const nextState = [...state];
        const index = nextState.findIndex(post => post.id === action.payload);
        if (index > -1) {
          nextState.splice(index, 1);
        }
        return nextState;
      default:
        return state;
    }
  },
});

export default postReducer;
