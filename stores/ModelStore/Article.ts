import { types as t, Instance } from 'mobx-state-tree';

export const Article = t.model('Article', {
  id: t.integer,
  title: t.string,
  description: t.string,
  creatTime: t.string,
  updateTime: t.string,
});

export type IArticle = Instance<typeof Article>;
