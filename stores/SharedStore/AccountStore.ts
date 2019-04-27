import { types as t } from 'mobx-state-tree';
import { ArticleQueryResult } from '../ModelStore';

export const AccountStore = t
  .model('AccountStore', {
    user: t.maybeNull(ArticleQueryResult),
  })
  .views(self => ({
    isLogin() {
      return !!self.user;
    },
  }));
