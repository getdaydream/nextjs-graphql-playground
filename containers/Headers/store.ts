import { types as t } from 'mobx-state-tree';

export const GlobalHeader = t
  .model('GlobalHeader', {
    showLoginModal: t.optional(t.boolean, false),
  })
  .actions(self => ({
    toggleLoginModal() {
      self.showLoginModal = !self.showLoginModal;
    },
  }));
