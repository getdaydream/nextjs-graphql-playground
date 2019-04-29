import { types as t, getParent } from 'mobx-state-tree';
import { GlobalHeader } from '@/containers/Headers/store';
import { AccountStore } from '../SharedStore';

const RootStore = t
  .model({
    account: t.optional(AccountStore, {}),
    globalHeader: t.optional(GlobalHeader, {}),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
  }))
  .actions(() => ({}));

export default RootStore;
