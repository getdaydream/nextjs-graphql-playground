import { types } from 'mobx-state-tree';

const Todo = types
  .model('Todo', {
    title: types.string,
    done: false,
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    },
  }));

const Store = types.model('Store', {
  todos: types.array(Todo),
});

// create an instance from a snapshot
const store = Store.create({
  todos: [
    {
      title: 'Get coffee',
    },
  ],
});

store.todos[0].done
