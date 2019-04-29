import { types as t, Instance } from 'mobx-state-tree';
import { QueryResult } from './QueryResult';

export const Article = t.model('Article', {
  id: t.integer,
  title: t.string,
  description: t.string,
  creatTime: t.string,
  updateTime: t.string,
});

export type IArticle = Instance<typeof Article>;

export const ArticleQueryResult = t
  .compose(
    QueryResult,
    t.model({ data: t.maybeNull(Article) }),
  )
  .named('ArticleQueryResult');
