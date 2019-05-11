import { createStandardAction } from 'typesafe-actions';

export interface User {
  id: number;
}

export const setUser = createStandardAction('@account/user/setUser')<User>();
