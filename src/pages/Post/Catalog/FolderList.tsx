import { Folder } from '@/store/post.interface';
import { Alignment, Button, ButtonGroup, Divider } from '@blueprintjs/core';
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
      <ButtonGroup
        vertical={true}
        alignText={Alignment.LEFT}
        className={styles.root}
      >
        {folders.map(f => (
          <div key={f.id}>
            <Button
              text={f.name}
              icon={<MdFolder />}
              className={styles.item}
              onClick={() => onChangeFolderId(f.id)}
              minimal={true}
              large={true}
              fill={true}
            />
            <Divider />
          </div>
        ))}
      </ButtonGroup>
    );
  }
}

export default inject(store => ({
  folders: store.post.currentFolders,
  onChangeFolderId: store.post.changeCurrentFolderId,
}))(FolderList);
