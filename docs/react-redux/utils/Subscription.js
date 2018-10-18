// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

/**
 * 封装 `connect` 组件到 redux store 的订阅逻辑，包括后代组件的嵌套订阅，用以保证父组件在后代组件之前重绘
 */

const CLEARED = null;
const nullListeners = { notify() {} };

function createListenerCollection() {
  /**
   * 监听逻辑类似 redux 代码中的 `createStore`
   */
  let current = [];
  let next = [];

  return {
    clear() {
      next = CLEARED;
      current = CLEARED;
    },

    notify() {
      const listeners = (current = next);
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },

    get() {
      return next;
    },

    subscribe(listener) {
      let isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    },
  };
}

export default class Subscription {
  constructor(store, parentSub, onStateChange) {
    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  }

  notifyNestedSubs() {
    this.listeners.notify();
  }

  isSubscribed() {
    return Boolean(this.unsubscribe);
  }

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        ? // 如果有 parentSub 就会监听 parentSub
          this.parentSub.addNestedSub(this.onStateChange)
        : // 没有 parentSub， 即当前组件是通往根节点路径中第一个连接到 redux store 的组件，直接调用 store.subscribe
          this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  }
}
