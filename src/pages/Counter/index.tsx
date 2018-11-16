import React from 'react';
import { connect } from 'react-redux';
import { ReduxStore } from 'src/store/store';
import { counterActions } from '../../store/counter';

interface Props {
  count: number;
  onAdd: (amount: number) => void;
  onIncrement: () => void;
}

class Counter extends React.Component<Props> {
  public onClickAdd = () => {
    const { onAdd } = this.props;
    onAdd(Math.ceil(Math.random() * 10));
  };

  public render() {
    const { onClickAdd } = this;
    const { count, onIncrement } = this.props;

    return (
      <div>
        {count}
        <button onClick={onClickAdd}>Add</button>
        <button onClick={onIncrement}>Increment</button>
      </div>
    );
  }
}

export default connect(
  (state: ReduxStore.state) => ({
    count: state.counter.count,
  }),
  {
    onAdd: counterActions.add,
    onIncrement: counterActions.increment,
  },
)(Counter);
