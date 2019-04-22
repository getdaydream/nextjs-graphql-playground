import { types as t } from 'mobx-state-tree';
import AccountStore from '../shared';
import { GlobalHeader } from '@/containers/Headers/store';

const RootStore = t
  .model({
    account: t.optional(AccountStore, {}),
    globalHeader: t.optional(GlobalHeader, {}),
  })
  .views(() => ({}))
  .actions(() => ({}));

export default RootStore;
