import RootStore from './RootStore';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree';

const isServer = typeof window === undefined;

let rootStore: IStore;

export type IStore = Instance<typeof RootStore>;
export type IStoreSnapshotIn = SnapshotIn<typeof RootStore>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStore>;

export const initStore = (snapshot?: any) => {
  if (isServer) {
    rootStore = RootStore.create(snapshot);
  }

  if (!rootStore) {
    rootStore = RootStore.create(snapshot);
  }

  if (snapshot) {
    applySnapshot(rootStore, snapshot);
  }

  return rootStore;
};
