import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';

declare namespace globalStore {
  export type state = StateType<typeof rootReducer>;
}
