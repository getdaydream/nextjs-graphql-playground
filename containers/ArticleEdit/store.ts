import { types as t } from 'mobx-state-tree';
import { Article } from '@/stores/ModelStore';
import { IArticle } from '@/stores/ModelStore/Article';

export const ArticleEditStore = t
  .model('ArticleCreate', {
    draft: t.optional(Article, {}),
  })
  .actions(self => ({
    setArticle(draft: IArticle) {
      self.draft = draft;
    },
  }));
