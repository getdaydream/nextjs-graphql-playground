import { types as t } from 'mobx-state-tree';

export const User = t.model('User', {
  id: t.maybeNull(t.number),
  createdAt: t.optional(t.string, ''),
  updatedAt: t.optional(t.string, ''),
});
