import { Button, Classes, Intent, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import  GistNew from './GistNew';
import styles from './index.module.scss';

interface State {
  isOpenNewGistDialog: boolean;
}

class GistHome extends React.Component<{}, State> {
  public state = {
    isOpenNewGistDialog: false,
  };

  public handleClickNewGist = async () => {
    this.setState({ isOpenNewGistDialog: true });
  };  

  public closeNewGistDialog = () => {
    this.setState({ isOpenNewGistDialog: false });
  };

  public renderSidebar = () => {
    return (
      <div className={styles.sidebar}>
        <Button
          text="New Gist"
          intent={Intent.PRIMARY}
          fill={true}
          onClick={this.handleClickNewGist}
        />
      </div>
    );
  };

  public render() {
    const { isOpenNewGistDialog } = this.state;

    return (
      <Fragment>
        <Navbar fixedToTop={true} className={Classes.DARK} />

        {this.renderSidebar()}

        < GistNew
          isOpen={isOpenNewGistDialog}
          onClose={this.closeNewGistDialog}
        />
      </Fragment>
    );
  }
}

export default GistHome;
