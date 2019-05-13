import { createReducer } from 'typesafe-actions';
import { setGlobalOverlay } from './actions';

interface InitialState {
  globalOverlay: string;
}

const initialState: InitialState = {
  globalOverlay: '',
};

export default createReducer(initialState).handleAction(
  setGlobalOverlay,
  (state, action) => ({ ...state, globalOverlay: action.payload }),
);
