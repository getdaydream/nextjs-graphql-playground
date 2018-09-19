import React from 'react';

import styles from './BasicLayout.css';

class BasicLayout extends React.Component {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <header className={styles.header} />
        {children}
      </div>
    );
  }
}

export default BasicLayout;
