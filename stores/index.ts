import RootStore from './RootStore';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree';
import { isBrowser } from '@/utils/is';
import { inject as mobxInject } from 'mobx-react';

let rootStore: IStore;

export type IStore = Instance<typeof RootStore>;
export type IStoreSnapshotIn = SnapshotIn<typeof RootStore>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStore>;

export const initStore = (snapshot?: IStoreSnapshotIn) => {
  if (!isBrowser) {
    rootStore = RootStore.create();
  }

  if (!rootStore) {
    rootStore = RootStore.create(snapshot);
  }

  if (snapshot) {
    applySnapshot(rootStore, snapshot);
  }

  return rootStore;
};

export interface InjectProps {
  store: IStore;
}

export const inject = mobxInject((store: IStore) => store);
