import verifyPlainObject from '../utils/verifyPlainObject';

export function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    const constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
export function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null &&
    mapToProps.dependsOnOwnProps !== undefined
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1;
}

/**
 * 当 MapStateToProps 或 MapDispatchToProps 是函数时调用
 * 该函数将 mapToProps 放在 proxy function 中：
 * 1. 确认 mapToProps 是否依赖 props，帮助 selectorFactory 决定当 props 改变的时候是否需要计算
 * 2. 在第一次调用时， 处理 mapToProps 返回另一个函数的情况，并在接下来的调用中将返回的函数作为真正的 mapToProps function
 * @param {*} mapToProps mapStateToProps or mapDispatchToProps function
 * @param {*} methodName
 */
export function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(stateOrDispatch, ownProps)
        : proxy.mapToProps(stateOrDispatch);
    };
    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    // detectFactoryAndVerify 用于确定真正的mapToProps（mapToProps 可能返回一个函数用于优化性能），并赋值给 proxy
    proxy.mapToProps = function detectFactoryAndVerify(
      stateOrDispatch,
      ownProps,
    ) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      let props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      // if (process.env.NODE_ENV !== 'production')
      //   verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
