import { API_BASE_URL } from './constants';

export const genApiPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

// 用于创建字符串数组映射至 `K: V` 的函数
export const strEnum = <T extends string>(o: T[]): { [K in T]: K } => {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
};
