import React from 'react';

interface State {
  count: number;
}

class App extends React.Component<{}, State> {
  public state = {
    count: 0,
  };

  public componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }

  public render() {
    const { count } = this.state;

    return <div> {`count is ${count}`}</div>;
  }
}

export default App;
