import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as user from './actions';

export type UserAction = ActionType<typeof user>;

interface UserProfile {
  email: string;
}

export interface UserState {
  isLogin: boolean;
  profile: UserProfile | null;
}

export const userReducer = combineReducers<UserState, UserAction>({
  isLogin: (state = false, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  profile: (state = null, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
});
