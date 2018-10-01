import React from 'react';

interface State {
  count: number;
}

class App extends React.Component<{}, State> {
  state = {
    count: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }

  render() {
    const { count } = this.state;

    return <div> {`count is ${count}`}</div>;
  }
}

export default App;
