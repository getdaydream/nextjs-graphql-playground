import { types as t, SnapshotOrInstance, cast } from 'mobx-state-tree';
import { Article } from '@/stores/ModelStore';

export const PostOverviewStore = t
  .model('PostOverview', {
    articles: t.array(Article),
  })
  .actions(self => ({
    setArticles(articles: SnapshotOrInstance<typeof self.articles>) {
      self.articles = cast(articles);
    },
  }));
