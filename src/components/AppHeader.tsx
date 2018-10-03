import React from 'react';

import styles from './AppHeader.module.scss';

class AppHeader extends React.Component {
  public render() {
    return <header className={styles.appHeader} />;
  }
}

export default AppHeader;
