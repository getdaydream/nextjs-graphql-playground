import React from 'react';
import styles from './styles/index.css';
import { inject, observer } from 'mobx-react';
import { IStore } from '@/stores';
import LoginModal from '../LoginModal';

interface Props {
  store?: IStore;
}

class Header extends React.Component<Props> {
  componentDidMount() {
    //
  }

  render() {
    const {
      globalHeader: { showLoginModal, toggleLoginModal },
    } = this.props.store!;

    return (
      <div className={styles.root}>
        <button onClick={toggleLoginModal}>Login</button>
        {showLoginModal && <LoginModal />}
      </div>
    );
  }
}

export default inject('store')(observer(Header));
