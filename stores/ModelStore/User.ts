import { types as t, SnapshotIn } from 'mobx-state-tree';

export const User = t.model('User', {
  id: t.string,
  nickname: t.string,
  // email: t.string,
  createTime: t.string,
  // updateTime: t.string,
});

export type IUserSnapshotIn = SnapshotIn<typeof User>;
