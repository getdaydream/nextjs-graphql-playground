import $$observable from 'symbol-observable'

import ActionTypes from './utils/actionTypes'

export default function createStore(reducer, preloadedState, enhancer) {
  // 如果只有两个参数，且第二个参数是function，那么把它作为enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    // 如果有 middleware  返回经过 middleware 包装后的 dispatch
    return enhancer(createStore)(reducer, preloadedState)
  }

  // 检查：reducer 必须是function

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState() {
    if (isDispatching) {
      // error
    }

    return currentState
  }

  /**
   * 每当 action 被分发且计算了nextState后，通知订阅者
   *
   * 可以在订阅函数内部调用 `dispatch()`，要注意的是：
   * 在每次 `dispatch()` 调用前会保存一份订阅者列表的 “快照”。
   * 如果在订阅函数被调用时 `subscribe` 或者`unsubscribe` ，不会影响本次的订阅者列表。
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      //  error
    }

    if (isDispatching) {
      //  error
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        //  error
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  /**
   * 分发 action， 计算 state， 并通知所有订阅者（在 `dispatch` 调用前的所有订阅者）
   */
  function dispatch(action) {
    // action必须是对象，且拥有type属性

    if (isDispatching) {
      //  error
    }

    // 计算当前state
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    /**
     * 使用 currentListeners 作为快照，遍历通知所有的订阅者
     * 在调用订阅函数的过程中，如果有`subscribe` 或 `unsubscribe` ，只会修改nextListeners，而不会影响 currentListeners
     * 保证了能调用所有在 `dispatch()` 前已经订阅的函数
     * 直到下次调用`dispatch()` 时，nextListeners 中的改变才会应用到 currentListeners ，作为新的订阅者列表
     */
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * 替换当前的 reducer ，并计算 state
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }

  /**
   * 为observable/reactive库预留的交互接口。
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * 最小的 observable 订阅方法
       * @param {Object} observer 任何可以作为observer使用的对象
       * observer对象应该包含一个`next`方法
       * @returns {subscription} 返回一个有 unsubscribe 方法的对象
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        // 创建一个状态变更回调函数： 把store最新的状态传给observer
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  /**
   * store 创建后，dispatch “INIT” action
   * 让所有的 reducer 返回默认的初始 state
   */
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
