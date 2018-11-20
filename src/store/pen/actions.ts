import { createAsyncAction } from 'typesafe-actions';
import { createAsyncActionTypes } from '../utils';

export const newPen = createAsyncAction(
  ...createAsyncActionTypes('pen', 'new'),
)();

export const updatePen = createAsyncAction(
  ...createAsyncActionTypes('pen', 'update'),
)();
