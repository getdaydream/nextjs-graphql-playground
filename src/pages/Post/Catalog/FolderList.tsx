import { Folder } from '@/store/post.interface';
import { MenuDivider, MenuItem } from '@blueprintjs/core';
import { inject } from 'mobx-react';
import React from 'react';
import { MdFolder } from 'react-icons/md';
import styles from './FolderList.module.scss';

interface InjectProps {
  folders: Folder[];
  onChangeFolderId: (id: number) => void;
}

class FolderList extends React.Component<InjectProps> {
  public render() {
    const { folders, onChangeFolderId } = this.props;

    return (
      <div>
        {folders.map(f => (
          <div key={f.id}>
            <MenuItem
              text={f.name}
              icon={<MdFolder />}
              className={styles.item}
              onClick={() => onChangeFolderId(f.id)}
            />
            <MenuDivider />
          </div>
        ))}
      </div>
    );
  }
}

export default inject(store => ({
  folders: store.post.currentFolders,
  onChangeFolderId: store.post.changeCurrentFolderId,
}))(FolderList);
