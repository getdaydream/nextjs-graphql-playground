import { types as t } from 'mobx-state-tree';
import AccountStore from '../AccountStore';

const rootStore = t
  .model({
    // model stores
    account: t.optional(AccountStore, {}),
    // model end
  })
  .views(() => ({}))
  .actions(() => ({}));

export default rootStore;
