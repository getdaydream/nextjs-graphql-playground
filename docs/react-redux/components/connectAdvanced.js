import hoistStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { Component, createElement } from 'react';

import Subscription from '../utils/Subscription';
import { storeShape, subscriptionShape } from '../utils/PropTypes';

let hotReloadingVersion = 0;
const dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  /**
   * 使用 object 包装 selector 用于记录上一次调用 run 的结果
   * selector: { run: function, shouldComponentUpdate: boolean, props: any, error: any }
   */
  const selector = {
    // 计算 nextProps 以及 shouldComponentUpdate
    run: function runComponentSelector(props) {
      try {
        const nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    },
  };

  return selector;
}

/**
 * connectAdvanced = (selectorFactory, options) => (WrappedComponent) => containerComponent
 * @param {*} selectorFactory
 * @param {*} options
 */
export default function connectAdvanced(
  /**
   * `selectorFactory` 返回一个 `selector` 函数
   * 用于从 `state`， `props` 和 `dispatch` 中计算新的 `props` 
   * 例如：
   * export default connectAdvanced((dispatch, options) => (nextState, nextOwnProps) =>    ({
        thing: state.things[props.thingId],
        saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
      }))(YourComponent)
   * 
   * `selectorFactory` 负责缓存 props，以提升性能
   */

  /*
    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
    outside of their selector as an optimization. Options passed to connectAdvanced are passed to
    the selectorFactory, along with displayName and WrappedComponent, as the second argument.

    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
    props. Do not use connectAdvanced directly without memoizing results between calls to your
    selector, otherwise the Connect component will re-render on every state or props change.
  */
  selectorFactory,
  // options object:
  {
    // the func used to compute this HOC's displayName from the wrapped component's displayName.
    // probably overridden by wrapper functions such as connect()
    getDisplayName = name => `ConnectAdvanced(${name})`,

    // shown in error messages
    // probably overridden by wrapper functions such as connect()
    methodName = 'connectAdvanced',

    // if defined, the name of the property passed to the wrapped element indicating the number of
    // calls to render. useful for watching in react devtools for unnecessary re-renders.
    renderCountProp = undefined,

    // determines whether this HOC subscribes to store changes
    shouldHandleStateChanges = true,

    // the key of props/context to get the store
    storeKey = 'store',

    // if true, the wrapped element is exposed by this HOC via the getWrappedInstance() function.
    withRef = false,

    // additional options are passed through to the selectorFactory
    ...connectOptions
  } = {},
) {
  const subscriptionKey = storeKey + 'Subscription';
  const version = hotReloadingVersion++;

  const contextTypes = {
    [storeKey]: storeShape,
    [subscriptionKey]: subscriptionShape,
  };
  const childContextTypes = {
    [subscriptionKey]: subscriptionShape,
  };

  return function wrapWithConnect(WrappedComponent) {
    invariant(
      typeof WrappedComponent == 'function',
      `You must pass a component to the function returned by ` +
        `${methodName}. Instead received ${JSON.stringify(WrappedComponent)}`,
    );

    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);

    const selectorFactoryOptions = {
      ...connectOptions,
      getDisplayName,
      methodName,
      renderCountProp,
      shouldHandleStateChanges,
      storeKey,
      withRef,
      displayName,
      wrappedComponentName,
      WrappedComponent,
    };

    class Connect extends Component {
      constructor(props, context) {
        super(props, context);

        this.version = version;
        this.state = {};
        this.renderCount = 0;
        // store 来源可能是 props 或是 context
        this.store = props[storeKey] || context[storeKey];
        /**
         * 标识 store 是否来自于 props 而不是 context
         * 正常情况下，应该使用 <Provider> ，从 context 传入 store
         * 只推荐在单元测试中对 store 进行伪造 (stub) 或者在非完全基于 React 的代码中才使用 props 传入 store
         */
        this.propsMode = Boolean(props[storeKey]);
        this.setWrappedInstance = this.setWrappedInstance.bind(this);

        // 检查： store 是否存在
        invariant(
          this.store,
          `Could not find "${storeKey}" in either the context or props of ` +
            `"${displayName}". Either wrap the root component in a <Provider>, ` +
            `or explicitly pass "${storeKey}" as a prop to "${displayName}".`,
        );

        this.initSubscription();
        this.initSelector();
      }

      getChildContext() {
        // 如果该组件的 store 来自 props, 那么对于任何通过 context 获取 store、 subscription 的后代来说，它的 subscription 是透明的，后代组件得到的不是该组件的 subscription，而是它从 context 中获取的 subscription
        // 如果组件的 store 来自 context， 那么它会跟随 the parent subscription，从而保证 Connect 自顶向下通知订阅类

        const subscription = this.propsMode ? null : this.subscription;
        return {
          [subscriptionKey]: subscription || this.context[subscriptionKey],
        };
      }

      componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount 会在ssr中调用，而 componentDidMount 和 componentWillUnmount 不会
        // 因此 trySubscribe 发生在 componentDidMount 时，否则在ssr中 unsubscription 永远不会调用导致内存泄漏
        // 由于子组件可能在 componentWillMount 时 dispatching an action 导致 state 变化， 必须重新 run selector 并可能重绘
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      }

      componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      }

      shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      }

      componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      }

      getWrappedInstance() {
        invariant(
          withRef,
          `To access the wrapped instance, you need to specify ` +
            `{ withRef: true } in the options argument of the ${methodName}() call.`,
        );
        return this.wrappedInstance;
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      }

      initSelector() {
        const sourceSelector = selectorFactory(
          this.store.dispatch,
          selectorFactoryOptions,
        );
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        // 计算 nextProps 以及 组件是否需要更新
        this.selector.run(this.props);
      }

      // 初始化订阅类
      initSubscription() {
        if (!shouldHandleStateChanges) return;

        /**
         * parentSub 的来源应该和 store 的来源相匹配。
         * 一个通过 props 连接到 store 的组件不应该使用来自 context 的订阅类， 反之亦然
         */

        // 如果当前组件是通往根节点路径中第一个通过context连接到 redux store 的组件，那么 parentSub 为 null
        const parentSub = (this.propsMode ? this.props : this.context)[
          subscriptionKey
        ];
        this.subscription = new Subscription(
          this.store,
          parentSub,
          this.onStateChange.bind(this),
        );

        /**
         * `notifyNestedSubs` 用作备份
         * 防止组件在通知订阅类的循环中 unmount 使 `this.subscript` 变为 null
         */
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(
          this.subscription,
        );
      }

      // 当 state 变化时的回调函数
      onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      }

      notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      }

      isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      }

      addExtraProps(props) {
        if (
          !withRef &&
          !renderCountProp &&
          !(this.propsMode && this.subscription)
        )
          return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        const withExtras = { ...props };
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription)
          withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      }

      render() {
        const selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return createElement(
            WrappedComponent,
            this.addExtraProps(selector.props),
          );
        }
      }
    }

    /* eslint-enable react/no-deprecated */

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          let oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(listener =>
              this.subscription.listeners.subscribe(listener),
            );
          }
        }
      };
    }

    // 复制子组件中非react原生的静态方法到父组件
    // hoistNonReactStatics(targetComponent, sourceComponent) => targetComponent
    return hoistStatics(Connect, WrappedComponent);
  };
}
