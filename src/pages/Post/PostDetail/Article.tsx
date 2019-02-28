import React from 'react';

class Article extends React.Component {
  public containerRef: React.RefObject<HTMLDivElement>;
  public editor: any;

  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
  }

  public componentDidMount() {
    //
  }

  public render() {
    return <div ref={this.containerRef} />;
  }
}

export default Article;
