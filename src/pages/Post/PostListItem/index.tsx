import { IPost } from '@/store/post/interface';
import { Menu, MenuItem, Popover } from '@blueprintjs/core';
import React from 'react';
import { MdDelete, MdSettings } from 'react-icons/md';
import styles from './index.module.css';

interface IOwnProps {
  id: number;
  active?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

interface IProps extends IOwnProps {
  post: IPost;
}

class PostListItem extends React.Component<IProps> {
  public render() {
    const {
      post: { title, description },
      onDelete,
      onClick,
    } = this.props;

    return (
      <div className={styles.postLitsItem} onClick={onClick}>
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
                text="Delete Post"
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
