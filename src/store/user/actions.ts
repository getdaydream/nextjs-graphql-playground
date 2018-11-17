import { createAsyncAction } from 'typesafe-actions';
import { createAsyncActionTypes } from '../utils';
import { UserProfile } from './reducer';

export const login = createAsyncAction(
  ...createAsyncActionTypes('user', 'login'),
)<{ email: string; password: string }, UserProfile, Error>();
