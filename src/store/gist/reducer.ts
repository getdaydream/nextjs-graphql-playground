// import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

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

const gistReducer = combineReducers<GistState, GistAction>({
  currentEditGist: (state = {} as Gist, action) => {
    switch (action.type) {
      case getType(actions.updateCurrentEditGist):
        return {
          ...state,
        };
      case getType(actions.addFileToCurrentEditGist):
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
