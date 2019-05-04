import { types as t } from 'mobx-state-tree';
import { User } from '../ModelStore';
import { IUserSnapshotIn } from '../ModelStore/User';

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
    setUser(user: IUserSnapshotIn) {
      self.user = user;
    },
  }));
