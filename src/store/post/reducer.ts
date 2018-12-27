// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  DELETE_POST_SUCCESS,
} from './constants';
import { PostState } from './interface';

export type PostAction = ActionType<typeof actions>;

// const getDefaultPostFile = () =>
//   ({
//     content: '',
//     filename: 'index',
//     filetype: 'typescript',
//   } as PostFile);

// const getDefaultEditPost = () =>
//   ({
//     description: '',
//     files: [getDefaultPostFile()],
//     folder: 'Default',
//     isPrivate: false,
//     title: '',
//     type: PostType.snippet,
//   } as Post);

const postReducer = combineReducers<PostState, PostAction>({
  idMapPost: (state = {}, action) => {
    switch (action.type) {
      case DELETE_POST_SUCCESS:
        const nextState = { ...state };
        delete nextState[action.payload];
        return nextState;
      default:
        return state;
    }
  },
  postIds: (state = [], action) => {
    switch (action.type) {
      case DELETE_POST_SUCCESS:
        const nextState = [...state];
        const index = nextState.findIndex(id => action.payload === id);
        nextState.splice(index, 1);
        return nextState;
      default:
        return state;
    }
  },
});

export default postReducer;
