import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type GistAction = ActionType<typeof actions>;

export interface Gist {
  id: number;
  project: Project;
}

export interface GistState {
  currentGistId: number;
  gistList: Gist[];
}

const penReducer = combineReducers<GistState, GistAction>({
  currentGistId: (state = 0, action) => {
    switch (action.type) {
      case getType(actions.newGist.success):
        // TODO:
        return state;
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

export default penReducer;
