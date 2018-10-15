基于 redux v4.0.0

## 概念

`Store`： 维持应用所有的 state 树 的一个对象。
`reducer`： 一个纯函数，输入 prevState 和 action, 返回 nextState
`enhancer`：使用`applyMiddleware`生成

## API

`combineReducers(reducers)`： 合并`reducers`对象为一个 reducer。

`createStore(reducer, [preloadedState], enhancer)`:
