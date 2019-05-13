import { createStandardAction } from 'typesafe-actions';

export const setGlobalOverlay = createStandardAction(
  '@global/globalOverlay/setGlobalOverlay',
)<string>();

export const noop = createStandardAction('noop')();
