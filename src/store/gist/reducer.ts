// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  ADD_FILE_TO_CURRENT_GIST,
  DELETE_GIST_SUCCESS,
  FETCH_GIST_LIST_SUCCESS,
  NEW_GIST_SUCCESS,
  RESET_CURRENT_GIST,
  UPDATE_CURRENT_GIST,
  UPDATE_IS_EDITING,
} from './constants';

export type GistAction = ActionType<typeof actions>;

export interface GistFile {
  id: number;
  filename: string;
  filetype: string;
  content: string;
  creat_at: Date;
  update_at: Date;
}

export interface Gist {
  id: number;
  title: string;
  description: string;
  files: GistFile[];
  isPrivate: boolean;
  creat_at: Date;
  update_at: Date;
}

export interface GistState {
  // gist 列表
  gistList: Gist[];
  // 当前显示的gist
  currentGist: Gist;
  // 是否在编辑
  isEditing: boolean;
}

const getDefaultGistFile = () =>
  ({
    content: '',
    filename: 'index',
    filetype: 'typescript',
  } as GistFile);

const getDefaultEditGist = () =>
  ({
    description: '',
    files: [getDefaultGistFile()],
    isPrivate: false,
    title: '',
  } as Gist);

const gistReducer = combineReducers<GistState, GistAction>({
  currentGist: (state = getDefaultEditGist() as Gist, action) => {
    switch (action.type) {
      case RESET_CURRENT_GIST:
        return getDefaultEditGist();
      case UPDATE_CURRENT_GIST:
        return {
          ...state,
          ...action.payload,
        };
      case ADD_FILE_TO_CURRENT_GIST:
        return {
          ...state,
          files: state.files.concat([getDefaultGistFile()]),
        };
      default:
        return state;
    }
  },
  gistList: (state = [] as Gist[], action) => {
    switch (action.type) {
      case NEW_GIST_SUCCESS:
        return state.concat([action.payload as Gist]);
      case FETCH_GIST_LIST_SUCCESS:
        return action.payload;
      case DELETE_GIST_SUCCESS:
        const nextState = [...state];
        const index = nextState.findIndex(gist => gist.id === action.payload);
        if (index > -1) {
          nextState.splice(index, 1);
        }
        return nextState;
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
});

export default gistReducer;
