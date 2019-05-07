import { types as t } from 'mobx-state-tree';

export const User = t.model('User', {
  id: t.string,
  nickname: t.string,
  // email: t.string,
  createTime: t.string,
  // updateTime: t.string,
});
