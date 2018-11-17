import { API_BASE_URL } from './constants';

export const genApiPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};
