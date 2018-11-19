import { createAsyncAction } from 'typesafe-actions';
import { createAsyncActionTypes } from '../utils';

export const newPlayground = createAsyncAction(
  ...createAsyncActionTypes('pen', 'new'),
);
