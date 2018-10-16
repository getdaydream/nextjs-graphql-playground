基于 redux v4.0.0

## 概念

`store`： 维持应用所有的 `state` 树 的一个对象。唯一能改变 `state` 的方法是`dispatch(action)`
`reducer`： 一个纯函数，输入 prevState 和 action, 返回 nextState  
`enhancer`：使用 `applyMiddleware(...middlewares)` 生成,加强 `store` 中的 `dispatch` 方法  
`middleware`: 提供 `action` 被发起之后，到达 `reducer` 之前的扩展点。`middleware` 的形式为 `middleware = ({getState,dispatch}) => next => action => {}`。采用洋葱模型。

## API

`combineReducers(reducers)`： 合并`reducers`对象为一个 reducer。

`createStore(reducer, [preloadedState], enhancer)`

`applyMiddleware(...middlewares)`
