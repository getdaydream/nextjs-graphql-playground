import React, { Fragment } from 'react';
import AppHeader from '../components/AppHeader';

import styles from './BasicLayout.module.scss';

class BasicLayout extends React.Component {
  public render() {
    const { children } = this.props;

    return (
      <Fragment>
        <AppHeader />

        <div className={styles.pageContent}>{children}</div>
      </Fragment>
    );
  }
}

export default BasicLayout;
