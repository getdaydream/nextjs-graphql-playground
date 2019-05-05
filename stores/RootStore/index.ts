import { types as t, getParent } from 'mobx-state-tree';
import { GlobalHeader } from '@/containers/Headers/store';
import { AccountStore } from '../SharedStore';
import { ArticleEdit } from '@/containers/ArticleEdit/store';

const RootStore = t
  .model({
    account: t.optional(AccountStore, {}),
    // UI store
    globalHeader: t.optional(GlobalHeader, {}),
    articleEdit: t.maybeNull(ArticleEdit),
  })
  .views(self => ({
    get root() {
      return getParent(self);
    },
  }))
  .actions(() => ({}));

export default RootStore;
