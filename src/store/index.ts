import loginView from './loginView';
import post from './post';
import postView from './postView';
import user from './user';

const store = {
  loginView,
  post,
  postView,
  user,
};

export type Store = typeof store;

export default store;
