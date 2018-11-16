import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';
import { UserAction } from './user';
import { CounterAction } from './counter/reducer';

declare module ReduxStore {
  export type state = StateType<typeof rootReducer>;
  export type RootAction = UserAction | CounterAction;
}
