import { createAsyncAction } from 'typesafe-actions';
import { createAsyncActionTypes } from '../utils';

export const newGist = createAsyncAction(
  ...createAsyncActionTypes('gist', 'new'),
)();

export const updateGist = createAsyncAction(
  ...createAsyncActionTypes('gist', 'update'),
)();
