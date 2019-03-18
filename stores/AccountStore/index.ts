import { types as t, getParent } from 'mobx-state-tree';
import { User } from '../ModelStore';

const AccountStore = t
  .model('AccountStore', {
    user: t.optional(User, {}),
    isLogin: t.optional(t.boolean, false),
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
