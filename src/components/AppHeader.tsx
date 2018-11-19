import React from 'react';

import styles from './AppHeader.module.scss';

interface Props {
  isFixed?: boolean;
}

class AppHeader extends React.Component<Props> {
  public render() {
    const { children, isFixed = false } = this.props;

    return (
      <header
        className={styles.appHeader}
        style={{ position: isFixed ? 'fixed' : undefined }}
      >
        {children}
      </header>
    );
  }
}

export default AppHeader;
