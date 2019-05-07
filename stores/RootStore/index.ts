import { types as t, getParent } from 'mobx-state-tree';
import { GlobalHeaderStore } from '@/containers/Headers/store';
import { AccountStore } from '../SharedStore';
import { ArticleEditStore } from '@/containers/ArticleEdit/store';
import { DraftOverviewStore } from '@/containers/DraftOverview/store';
import { PostOverviewStore } from '@/containers/PostOverview/store';

const RootStore = t
  .model({
    account: t.optional(AccountStore, {}),
    // UI store
    globalHeader: t.optional(GlobalHeaderStore, {}),
    // temp UI store
    articleEdit: t.maybeNull(ArticleEditStore),
    draftOverview: t.maybeNull(DraftOverviewStore),
    postOverview: t.maybeNull(PostOverviewStore),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
  }))
  .actions(self => ({
    initArticleEdit() {
      self.articleEdit = ArticleEditStore.create();
    },
    destoryArticleEdit() {
      self.articleEdit = null;
    },
    initDraftOverview() {
      self.draftOverview = DraftOverviewStore.create();
    },
  }));

export default RootStore;
