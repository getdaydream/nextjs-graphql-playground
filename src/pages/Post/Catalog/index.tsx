import c from 'classnames';
import { inject } from 'mobx-react';
import React from 'react';
import FolderList from './FolderList';
import styles from './index.module.scss';

interface InjectProps {
  postIds: number[];
  fetchFolders: () => Promise<void>;
}

interface OwnProps {
  className?: string;
}

class Catalog extends React.Component<OwnProps & InjectProps> {
  public componentDidMount() {
    const { fetchFolders } = this.props;
    fetchFolders();
  }

  public render() {
    const { className } = this.props;

    return (
      <div className={c(className, styles.root)}>
        <FolderList />
      </div>
    );
  }
}

export default inject(store => ({
  fetchFolders: store.post.fetchFolders,
  postIds: store.post.postIds,
}))(Catalog);
