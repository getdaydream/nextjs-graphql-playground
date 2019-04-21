import { types as t } from 'mobx-state-tree';
import { User } from '../ModelStore';

export const AccountStore = t.model('AccountStore', {
  isLogin: t.optional(t.boolean, false),
  user: t.maybeNull(User),
});
