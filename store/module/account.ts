import {
  ActionsUnion,
  createAction,
} from '@sandstormmedia/react-redux-ts-utils';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { delay, filter, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../app-state';

interface User {
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

//
// Actions
//
export enum ActionTypes {
  FETCH_USER = '@@account/user/FETCH_USER',
  SET_USER = '@@account/user/SET_USER',
}

export const actions = {
  fetchTemplate: () => createAction(ActionTypes.FETCH_USER),
  setTemplate: (newTemplate: string) =>
    createAction(ActionTypes.SET_USER, { newTemplate }),
};

type TemplatesActions = ActionsUnion<typeof actions>;

//
// Reducer
//
export function reducer(
  state: Readonly<AccountState> = initialState,
  action: TemplatesActions,
): AccountState {
  switch (action.type) {
    default:
      return state;
  }
}

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
const fetchUserEpic: Epic<TemplatesActions> = (
  actions$: ActionsObservable<TemplatesActions>,
) =>
  actions$.pipe(
    filter(action => action.type === ActionTypes.FETCH_USER),
    delay(1000),
    mergeMap(action =>
      ajax
        .getJSON('/api/endpoint')
        .pipe(map(response => actions.setTemplate('response'))),
    ),
  );

export const epics = combineEpics(fetchUserEpic);
