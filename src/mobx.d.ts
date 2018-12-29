import * as React from 'react';
import { inject } from 'mobx-react';
import { Store } from './store';

export type Omit<A extends object, K extends string | number | symbol> = Pick<
  A,
  Exclude<keyof A, K>
>;

declare module 'mobx-react' {
  export function inject<D extends object>(
    mapStoreToProps: (store: Store) => D,
  ): <A extends D>(
    component: React.ComponentType<A>,
  ) => React.SFC<Omit<A, keyof D> & Partial<D>>;
}
