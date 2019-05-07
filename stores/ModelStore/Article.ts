import { types as t, Instance } from 'mobx-state-tree';

export const Article = t.model('Article', {
  id: t.maybe(t.integer),
  title: t.optional(t.string, ''),
  content: t.optional(t.string, ''),
  cover: t.optional(t.string, ''),
  creatTime: t.optional(t.string, ''),
  updateTime: t.optional(t.string, ''),
});

export interface IArticle extends Instance<typeof Article> {}
