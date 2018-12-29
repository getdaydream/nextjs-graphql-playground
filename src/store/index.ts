import loginView from './loginView';
import post from './post';
import user from './user';

const store = {
  loginView,
  post,
  user,
};

export type Store = typeof store;

export default store;
