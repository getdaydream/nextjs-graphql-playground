import { gistActions } from '@/store/gist';
import { Gist } from '@/store/gist/reducer';
import { ReduxStore } from '@/store/store';
import { Button, Classes, Intent, Navbar } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import GistEdit from './GistEdit';
import styles from './index.module.scss';

interface Props extends RouteComponentProps<{}> {
  gistList: Gist[];
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
  (state: ReduxStore.state) => ({
    gistList: state.gist.gistList,
  }),
  {
    onClickNewGist: gistActions.resetCurrnetEditGistAction,
    onFetchGistList: gistActions.fetchGistListRequestAction,
  },
)(GistHome);
