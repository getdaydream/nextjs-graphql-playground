import { types as t, getParent } from 'mobx-state-tree';
import { User } from '../model';

const AccountStore = t
  .model('AccountStore', {
    isLogin: t.optional(t.boolean, false),
    user: t.maybeNull(User),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
  }))
  .actions(self => ({
    logout() {
      self.isLogin = false;
    },
  }));

export default AccountStore;
