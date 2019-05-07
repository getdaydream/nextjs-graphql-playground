import * as Account from './module/account';

export type AppState = Readonly<{
  account: Account.AccountState;
}>;
