import { types as t } from 'mobx-state-tree';

export const QueryResult = t.model('QueryResult', {
  loading: t.optional(t.boolean, true),
});
