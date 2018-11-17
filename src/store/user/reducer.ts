import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
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
      case getType(actions.login.success):
        // TODO: find a better way of redirecting
        window.location.replace(`${window.location.origin}/#/explore`);
        return Object.assign(state, action.payload);
      default:
        return state;
    }
  },
});
export default userReducer;
