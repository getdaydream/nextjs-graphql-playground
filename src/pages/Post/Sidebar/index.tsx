import { PostType } from '@/store/post.interface';
import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import c from 'classnames';
import { inject } from 'mobx-react';
import React from 'react';
import { FaFile } from 'react-icons/fa';
import { MdAdd, MdFolder } from 'react-icons/md';
import styles from './index.module.scss';

interface InjectProps {
  createPost: (type: PostType) => Promise<void>;
}

interface Props {
  className?: string;
}

class Sidebar extends React.Component<Props & InjectProps> {
  public render() {
    const { className, createPost } = this.props;

    return (
      <div className={c(styles.sidebar, className)}>
        <Popover position={Position.BOTTOM_RIGHT}>
          <Button
            icon={<MdAdd size={24} />}
            title="Create Post"
            className={styles.createButton}
          />
          <Menu>
            <MenuItem
              text="New Snippet"
              onClick={() => createPost(PostType.snippet)}
            />
            <MenuItem
              text="New Markdown"
              onClick={() => createPost(PostType.markdown)}
            />
          </Menu>
        </Popover>
        <div className={styles.tabList}>
          <Button
            icon={<FaFile size={24} />}
            minimal={true}
            fill={true}
            className={styles.tabItem}
          />
          <Button
            icon={<MdFolder size={24} />}
            fill={true}
            minimal={true}
            className={styles.tabItem}
          />
        </div>
      </div>
    );
  }
}

export default inject(store => ({ createPost: store.post.createPost }))(
  Sidebar,
);
