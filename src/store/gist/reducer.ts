// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  ADD_FILE_TO_CURRENT_EDIT_GIST,
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
  currentGistId: number;
  gistList: Gist[];
  currentEditGist: Gist;
}

const getDefaultEditGist = () => ({
  description: '',
  files: [{ filename: '', filetype: 'typescript' }],
  title: '',
});

const gistReducer = combineReducers<GistState, GistAction>({
  currentEditGist: (state = getDefaultEditGist() as Gist, action) => {
    switch (action.type) {
      case UPDATE_CURRENT_EDIT_GIST:
        return {
          ...state,
        };
      case ADD_FILE_TO_CURRENT_EDIT_GIST:
        return {
          ...state,
        };
      default:
        return state;
    }
  },
  currentGistId: (state = 0, action) => {
    switch (action.type) {
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
