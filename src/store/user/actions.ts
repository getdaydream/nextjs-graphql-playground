import { action } from 'typesafe-actions';
import { LOGIN } from './constants';

export const login = (params: { email: string; password: string }) =>
  action(LOGIN, params);
