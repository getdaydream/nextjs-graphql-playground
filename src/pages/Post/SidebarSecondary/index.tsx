import c from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface Props {
  postIds: number[];
  className?: string;
}

class SidebarSecondary extends React.Component<Props> {
  public render() {
    const { className } = this.props;

    return (
      <div className={c(className, styles.root)}>
        {/* {postIds.map(id => (
          <PostListItem key={id} id={id} />
        ))} */}
      </div>
    );
  }
}

export default SidebarSecondary;
