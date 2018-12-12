// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  ADD_FILE_TO_CURRENT_EDIT_GIST,
  RESET_CURRENT_EDIT_GIST,
  UPDATE_CURRENT_EDIT_GIST,
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
  creat_at: Date;
  update_at: Date;
}

export interface GistState {
  // gist 列表
  gistList: Gist[];
  // 当前编辑的gist
  currentEditGist: Gist;
}

const getDefaultGistFile = () =>
  ({
    content: '',
    filename: '',
    filetype: 'typescript',
  } as GistFile);

const getDefaultEditGist = () =>
  ({
    description: '',
    files: [getDefaultGistFile()],
    title: '',
  } as Gist);

const gistReducer = combineReducers<GistState, GistAction>({
  currentEditGist: (state = getDefaultEditGist() as Gist, action) => {
    switch (action.type) {
      case RESET_CURRENT_EDIT_GIST:
        return getDefaultEditGist();
      case UPDATE_CURRENT_EDIT_GIST:
        return {
          ...state,
          ...action.payload,
        };
      case ADD_FILE_TO_CURRENT_EDIT_GIST:
        return {
          ...state,
          files: state.files.concat([getDefaultGistFile()]),
        };
      default:
        return state;
    }
  },
  gistList: (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
});

export default gistReducer;
