基于 react-redux 5.1.0-test.1

## `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

- `[mapStateToProps(state, [ownProps]): stateProps] (Function)`: `state` 是 `Redux store` 的状态， `ownProps` 是所 connect 的组件的 `props`

## 设计思路

- 通过 `Provider` 使用 `React Context` 注入 `Redux store`
- `connect` 包装组件返回一个高阶组件。该组件会连接到`Redux store`，并通过 `store` 和 `ownProps` 计算出 `mergedProps` 并传递给被包裹的组件。

## `connectAdvanced`

`connectAdvanced = (selectorFactory, options) => WrappedComponent => ConnectedComponent`

## `selectorFactory`

`selectorFactory` 返回一个 `selector` 函数: `selectorFactory = (dispatch, options) => (state, ownProps) => mergedProps`。  
用于根据 `nextState`，`nextOwnProps` 以及 `options` 计算 `mergedProps`。 `mergedProps` 最终会传递给 `WrappedComponent`。
其中 `options` 包含 `connect`时传入的参数： `mapStateToProps`，`mapDispatchToProps`，`pure`等。

- `options.pure` 默认为 `true`
- `options.pure` 为 `false` 时
