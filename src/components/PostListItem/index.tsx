import { Post } from '@/store/post/reducer';
import { Menu, MenuItem, Popover } from '@blueprintjs/core';
import React from 'react';
import { MdDelete, MdSettings } from 'react-icons/md';
import styles from './index.module.css';

interface Props extends Partial<Post> {
  active: boolean;
  onDelete: () => void;
  className?: string;
}

class PostListItem extends React.Component<Props> {
  public render() {
    const { title, description, onDelete } = this.props;

    return (
      <div className={styles.postLitsItem}>
        <div>
          <div />
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <Popover
          target={
            <div className={styles.settingIcon}>
              <MdSettings size={16} color="#b3b3b3" />
            </div>
          }
          content={
            <Menu>
              <MenuItem
                icon={<MdDelete size={16} color="#bfccd6" />}
                text="删除文章"
                onClick={onDelete}
              />
            </Menu>
          }
        />
      </div>
    );
  }
}

export default PostListItem;
