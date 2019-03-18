import { types as t } from 'mobx-state-tree';

export const User = t.model('User', {
  id: t.maybeNull(t.number),
  nickname: t.maybeNull(t.string),
  createdAt: t.maybeNull(t.string),
  updatedAt: t.maybeNull(t.string),
});
