import { types as t, SnapshotOrInstance } from 'mobx-state-tree';
import { User } from '../ModelStore';

export const AccountStore = t
  .model('AccountStore', {
    user: t.maybeNull(User),
  })
  .views(self => ({
    isLogin() {
      return !!self.user;
    },
  }))
  .actions(self => ({
    setUser(user: SnapshotOrInstance<typeof User>) {
      self.user = user;
    },
  }));
