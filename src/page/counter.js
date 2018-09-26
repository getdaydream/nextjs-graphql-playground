import React from 'react';
import { connect } from 'react-redux';

import { INCREMENT, DECREMENT, CLEAR } from '../store/actionTypes';

class Counter extends React.Component {
  render() {

    return (
      <div>
        {this.props.total}
        <button onClick={this.props.add}>加</button>
        <button onClick={this.props.subtract}>减</button>
        <button onClick={this.props.clear}>清除</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    total: state.counter.count,
  }),
  dispatch => ({
    add: () => dispatch({ type: INCREMENT }),
    subtract: () => dispatch({ type: DECREMENT }),
    clear: () => dispatch({ type: CLEAR }),
  }),
)(Counter);
