import { types as t } from 'mobx-state-tree';

export const Post = t.model('Post', {
  id: t.integer,
});
