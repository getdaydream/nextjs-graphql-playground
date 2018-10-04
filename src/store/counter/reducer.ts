import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as counter from './actions';
import { ADD, INCREMENT } from './constants';

export type CounterAction = ActionType<typeof counter>;

export interface CounterState {
  readonly count: number;
}

export const counterReducer = combineReducers<CounterState, CounterAction>({
  count: (state = 0, action) => {
    switch (action.type) {
      case ADD:
        return state + action.payload;
      case INCREMENT:
        return state + 1;
      default:
        return state;
    }
  },
});
