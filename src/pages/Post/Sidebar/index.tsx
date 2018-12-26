import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import c from 'classnames';
import React from 'react';
import { FaFile } from 'react-icons/fa';
import { MdAdd, MdFolder } from 'react-icons/md';
import styles from './index.module.scss';

interface Props {
  className?: string;
}

class Sidebar extends React.Component<Props> {
  public render() {
    const { className } = this.props;

    return (
      <div className={c(styles.sidebar, className)}>
        <Popover position={Position.BOTTOM_RIGHT}>
          <Button
            icon={<MdAdd size={24} />}
            title="Create Post"
            className={styles.createButton}
          />
          <Menu>
            <MenuItem text="New Snippet" />
            <MenuItem text="New Markdown" />
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

export default Sidebar;
