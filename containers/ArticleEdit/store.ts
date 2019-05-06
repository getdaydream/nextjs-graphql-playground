import { types as t } from 'mobx-state-tree';
import { Article } from '@/stores/ModelStore';
import { IArticle } from '@/stores/ModelStore/Article';

export const ArticleEdit = t
  .model('ArticleCreate', {
    article: t.optional(Article, {}),
  })
  .actions(self => ({
    updateArticle(article: IArticle) {
      self.article = article;
    },
  }));
