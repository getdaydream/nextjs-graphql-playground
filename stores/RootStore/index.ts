import { types as t, getParent } from 'mobx-state-tree';
import AccountStore from '../shared';
import { GlobalHeader } from '@/containers/Headers/store';

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
