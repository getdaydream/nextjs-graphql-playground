// TODO: see Flux Standard Action

import { combineEpics, Epic } from 'redux-observable';
import { filter } from 'rxjs/operators';
import {
  createStandardAction,
  createReducer,
  getType,
  RootAction,
  RootState,
} from 'typesafe-actions';

interface User {
  id: number;
  email: string;
  username: string;
}

//
// State
//
export type AccountState = Readonly<{
  user: User | null;
}>;

const initialState: AccountState = {
  user: null,
};

export const accountActions = {
  fetchUser: createStandardAction('@account/user/FETCH_USER')(),
  setUser: createStandardAction('@account/user/SET_USER')<number>(),
};

//
// Reducer
//
// export function reducer(
//   state: Readonly<AccountState> = initialState,
//   action: TemplatesActions,
// ): AccountState {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

export const reducer = createReducer(initialState).handleAction(
  accountActions.setUser,
  (state, action) => {
    return state;
  },
);

//
// Selectors
//
// const userSelector = (state: AppState) => state.;

export const selectors = {
  // template: templateSelector,
};

//
// Async action handlers
//
const fetchUserEpic: Epic<RootAction, RootAction, RootState> = actions$ =>
  actions$.pipe(
    filter(action => action.type === getType(accountActions.fetchUser)),
  );

export const epics = combineEpics(fetchUserEpic);
