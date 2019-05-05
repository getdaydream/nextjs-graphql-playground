import { inject } from 'mobx-react';
import { IStore } from '@/stores';

// TODO: refine this
// https://github.com/mobxjs/mobx-react/issues/256
declare module 'mobx-react' {
  export function inject<D extends object>(
    mapStoreToProps: (store: IStore) => IStore,
  ): <A extends D>(
    component: React.ComponentType<A> | React.SFC<A>,
  ) => React.SFC<Omit<A, keyof D> & Partial<D>> & IWrappedComponent<A>;
  // export function inject<D extends object>(
  //   mapStoreToProps: (store: IStore) => D,
  // ): <A extends D>(
  //   component: React.ComponentType<A> | React.SFC<A>,
  // ) => React.SFC<Omit<A, keyof D> & Partial<D>> & IWrappedComponent<A>;
}

// // TODO: make this work
// declare global {
//   namespace NodeJS {
//     // TODO: make this work
//     interface Process {
//       browser: boolean;
//     }

//     interface ProcessEnv {
//       GITHUB_AUTH_TOKEN: string;
//       NODE_ENV: 'development' | 'production';
//     }
//   }
// }

declare interface Process {
  browser: boolean;
}

declare module '*.css';
