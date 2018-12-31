import { Button } from '@blueprintjs/core';
import c from 'classnames';
import { inject } from 'mobx-react';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import FolderList from './FolderList';
import styles from './index.module.scss';
import PostList from './PostList';

interface InjectProps {
  isRoot: boolean;
  postIds: number[];
  fetchFolders: () => Promise<void>;
  goBackLastLevel: () => void;
}

interface OwnProps {
  className?: string;
}

class Catalog extends React.Component<OwnProps & InjectProps> {
  public componentDidMount() {
    const { fetchFolders } = this.props;
    fetchFolders();
  }
  public renderHeader = () => {
    const { isRoot, goBackLastLevel } = this.props;
    return (
      <div className={styles.header}>
        <Button
          minimal={true}
          icon={<MdArrowBack size={16} />}
          disabled={isRoot}
          onClick={goBackLastLevel}
        />
      </div>
    );
  };

  public render() {
    const { className } = this.props;

    return (
      <div className={c(className, styles.root)}>
        {this.renderHeader()}
        <div className={styles.content}>
          <FolderList />
          <PostList />
        </div>
      </div>
    );
  }
}

export default inject(store => ({
  fetchFolders: store.post.fetchFolders,
  goBackLastLevel: store.post.goBackLastLevel,
  isRoot: store.post.isRoot,
  postIds: store.post.postIds,
}))(Catalog);
