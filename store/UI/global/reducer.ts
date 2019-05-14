import { createReducer } from 'typesafe-actions';
import { setGlobalOverlay } from './actions';

interface InitialState {
  overlay: string;
}

const initialState: InitialState = {
  overlay: '',
};

export default createReducer(initialState).handleAction(
  setGlobalOverlay,
  (state, action) => ({ ...state, overlay: action.payload }),
);
