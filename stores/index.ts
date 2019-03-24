import RootStore from './RootStore';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree';

let rootStore: IStore;

export type IStore = Instance<typeof RootStore>;
export type IStoreSnapshotIn = SnapshotIn<typeof RootStore>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStore>;

export const initStore = (isInitialRender: boolean, snapshot?: any) => {
  if (isInitialRender) {
    rootStore = RootStore.create();
  }

  if (!rootStore) {
    rootStore = RootStore.create();
  }

  if (snapshot) {
    applySnapshot(rootStore, snapshot);
  }

  return rootStore;
};
