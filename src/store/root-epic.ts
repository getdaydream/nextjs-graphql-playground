import { AxiosError } from 'axios';
import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import gistEpic from './gist/epics';
import userEpic from './user/epics';

/**
 * AxiosError 是由 Error 构造的，目前没有很好的办法判断是否是 AxiosError
 * 未来或许会增加一个标志位
 * https://github.com/axios/axios/blob/75c8b3f146aaa8a71f7dca0263686fb1799f8f31/lib/core/enhanceError.js
 */
const isAxiosError = (err: AxiosError) => {
  return err.code && err.config && err.request && err.response;
};

/**
 * global error handling
 * https://github.com/redux-observable/redux-observable/issues/94
 */
export const rootEpic = (action$, store) =>
  combineEpics(userEpic, gistEpic)(action$, store).pipe(
    catchError((err, source) => {
      if (isAxiosError(err)) {
        // TODO: dispatch redux action
        console.log(err);
      } else {
        console.warn('Unhandled error');
        throw err;
      }
      return source;
    }),
  );
