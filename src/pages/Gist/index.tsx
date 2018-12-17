import GistListItem from '@/components/GistListItem';
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
  onDeleteGist: (id: number) => void;
  onFetchGistList: () => void;
  onClickNewGist: () => void;
}

interface State {
  hoverIndex: number;
}

class GistHome extends React.Component<Props, State> {
  public state = {
    hoverIndex: -1,
  };

  public componentDidMount() {
    const { onFetchGistList } = this.props;
    onFetchGistList();
  }

  public handleClickNewGist = async () => {
    const { onClickNewGist } = this.props;
    onClickNewGist();
  };

  public handleHoverIndexChange = (id: number) => {
    this.setState({ hoverIndex: id });
  };

  public renderSidebar = () => {
    const { gistList, onDeleteGist } = this.props;
    const { hoverIndex } = this.state;

    return (
      <div className={styles.sidebar}>
        <Button
          text="New Gist"
          intent={Intent.PRIMARY}
          fill={true}
          onClick={this.handleClickNewGist}
        />
        {gistList.length > 0 &&
          gistList.map(gist => (
            <GistListItem
              key={gist.id}
              hover={gist.id === hoverIndex}
              onHoverEnter={() => this.handleHoverIndexChange(gist.id)}
              onHoverLeave={() => this.handleHoverIndexChange(-1)}
              onDelete={() => onDeleteGist(gist.id)}
              {...gist}
            />
          ))}
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
    onDeleteGist: gistActions.deleteGistRequestAction,
    onFetchGistList: gistActions.fetchGistListRequestAction,
  },
)(GistHome);
