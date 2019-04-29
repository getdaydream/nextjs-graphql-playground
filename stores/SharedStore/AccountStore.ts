import { types as t } from 'mobx-state-tree';
import { User } from '../ModelStore';

export const AccountStore = t
  .model('AccountStore', {
    user: t.maybeNull(User),
  })
  .views(self => ({
    isLogin() {
      return !!self.user;
    },
  }));
