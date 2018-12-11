import { Button, Classes, Intent, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './index.module.scss';

interface Props extends RouteComponentProps<{}> {}

interface State {
  isOpenNewGistDialog: boolean;
}

class GistHome extends React.Component<Props, State> {
  public state = {
    isOpenNewGistDialog: false,
  };

  public handleClickNewGist = async () => {
    const { history } = this.props;
    history.push('/gist/new');
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
    return (
      <Fragment>
        <Navbar fixedToTop={true} className={Classes.DARK} />

        {this.renderSidebar()}
      </Fragment>
    );
  }
}

export default GistHome;
