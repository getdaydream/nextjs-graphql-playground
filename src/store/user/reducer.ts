import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { userActionTypes } from '../user';
import * as actions from './actions';

export type UserAction = ActionType<typeof actions>;

export interface UserProfile {
  email: string;
}

export interface UserState {
  isLogin: boolean;
  profile: UserProfile;
}

const userReducer = combineReducers<UserState, UserAction>({
  isLogin: (state = false, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  profile: (state = {} as UserProfile, action) => {
    switch (action.type) {
      case userActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          profile: action.payload,
        };
      default:
        return state;
    }
  },
});
export default userReducer;
