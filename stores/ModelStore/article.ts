import { types as t } from 'mobx-state-tree';

export const Article = t.model('Article', {
  id: t.integer,
  title: t.string,
  description: t.string,
  isPrivate: t.boolean,
  createdAt: t.string,
  updatedAt: t.string,
});
