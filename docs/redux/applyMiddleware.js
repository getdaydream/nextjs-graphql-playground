import compose from './compose'

/**
 * middleware 提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。
 * 每个 middleware 都会得到 `dispatch` 和 `getState` 函数
 * middleware 的形式为 middleware = ({getState,dispatch}) => next => action => {}
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    // 每个 middleware 接受 Store 的 `dispatch` 和 `getState` 函数作为命名参数
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    /**
     * 返回本身的 store 以及经过包装后的 dispatch
     */
    return {
      ...store,
      /**
       * 如果 applyMiddleware(middleware1, middleware2)
       * 那么，此时调用 dispatch 的结果为  m1(m2(store.dispatch))(action)
       * m1, m2 为传入了 middlewareAPI 之后的结果 m = next => action => {}
       * 此时，m1 的 next 参数为 m2(store.dispatch)，当调用 next(action) 相当于调用 m2(store.dispatch)(action)，将控制权交给了 m2
       * 整个 middleware 调用链中，除了最后一个 middleware，其他 middleware 的 next 参数都是下一个等待调用的 middleware
       * 而最后一个 middleware 的 next 参数则是真正的 store.dispatch
       * 而在 next(action) 完之后，控制权重新返回给 middleware 本身，这是一个洋葱模型
       */
      dispatch
    }
  }
}
