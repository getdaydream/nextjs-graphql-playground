import { types as t } from 'mobx-state-tree';

export const GlobalHeaderStore = t
  .model('GlobalHeader', {
    showAuthModal: t.optional(t.boolean, false),
  })
  .actions(self => ({
    setShowAuthModal(isOpen: boolean) {
      self.showAuthModal = isOpen;
    },
  }));
