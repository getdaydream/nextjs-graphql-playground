import { action } from 'typesafe-actions';
import { createAsyncAction } from 'typesafe-actions';
import { createAsyncActionTypes } from '../utils';
import {
  ADD_FILE_TO_CURRENT_EDIT_GIST,
  UPDATE_CURRENT_EDIT_GIST,
} from './constants';
import { Gist } from './reducer';

export const newGist = createAsyncAction(
  ...createAsyncActionTypes('gist', 'new'),
)<Gist, Gist, Error>();

export const updateGist = createAsyncAction(
  ...createAsyncActionTypes('gist', 'update'),
)();

export const updateCurrentEditGist = (gist: Partial<Gist>) =>
  action(UPDATE_CURRENT_EDIT_GIST, gist);

export const addFileToCurrentEditGist = () =>
  action(ADD_FILE_TO_CURRENT_EDIT_GIST);
