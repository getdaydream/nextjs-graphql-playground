import { action, createAsyncAction } from 'typesafe-actions';
import { LOGIN_SUCCESS } from './constants';
import { UserProfile } from './reducer';

export const loginSuccess = (profile: UserProfile) =>
  action(LOGIN_SUCCESS, profile);

export const fetchTodos = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE',
)<{ email: string; password: string }, Array<{}>, Error>();
