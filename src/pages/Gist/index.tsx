import { gistActions } from '@/store/gist';
import { Button, Classes, Intent, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import GistEdit from './GistEdit';
import styles from './index.module.scss';

interface Props extends RouteComponentProps<{}> {
  onFetchGistList: () => void;
  onClickNewGist: () => void;
}

class GistHome extends React.Component<Props> {
  public componentDidMount() {
    const { onFetchGistList } = this.props;
    onFetchGistList();
  }

  public handleClickNewGist = async () => {
    const { onClickNewGist } = this.props;
    onClickNewGist();
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

  public renderMainContent = () => {
    return <GistEdit />;
  };

  public render() {
    return (
      <Fragment>
        <Navbar fixedToTop={true} className={Classes.DARK} />

        {this.renderSidebar()}

        <main className={styles.main}>{this.renderMainContent()}</main>
      </Fragment>
    );
  }
}

export default connect(
  null,
  {
    onClickNewGist: gistActions.resetCurrnetEditGistAction,
    onFetchGistList: gistActions.fetchGistListRequestAction,
  },
)(GistHome);
