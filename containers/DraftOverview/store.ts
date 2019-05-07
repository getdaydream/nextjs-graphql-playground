import { types as t, SnapshotOrInstance, cast } from 'mobx-state-tree';
import { Article } from '@/stores/ModelStore';

export const DraftOverviewStore = t
  .model('DraftOverview', {
    // 数组会默认为空数组
    // same as t.optional(t.array(Article), [])
    drafts: t.array(Article),
  })
  .actions(self => ({
    setDrafts(drafts: SnapshotOrInstance<typeof self.drafts>) {
      self.drafts = cast(drafts);
    },
  }));
