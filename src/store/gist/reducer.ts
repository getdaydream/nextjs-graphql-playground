import { Project } from '@stackblitz/sdk/typings/interfaces';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type PenAction = ActionType<typeof actions>;

export interface Pen {
  id: number;
  project: Project;
}

export interface PenState {
  current: Pen;
  penList: Pen[];
}

const penReducer = combineReducers<PenState, PenAction>({
  current: (state = {} as Pen, action) => {
    switch (action.type) {
      case getType(actions.newGist.success):
        // TODO:
        return state;
      default:
        return state;
    }
  },
  penList: (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
});

export default penReducer;
