import { Classes, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';

class Gist extends React.Component {
  public renderSidebar = () => {
    return <div />;
  };

  public render() {
    return (
      <Fragment>
        <Navbar fixedToTop={true} className={Classes.DARK} />

        {this.renderSidebar()}
      </Fragment>
    );
  }
}

export default Gist;
