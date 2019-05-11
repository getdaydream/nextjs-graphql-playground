import { createReducer } from 'typesafe-actions';
import { User, setUser } from './actions';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export default createReducer(initialState).handleAction(
  setUser,
  (state, actions) => ({ ...state, user: actions.payload }),
);
