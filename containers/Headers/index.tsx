import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '@/stores';
import LoginModal from '../LoginModal';
import { Root } from './styles';

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
      <Root>
        <button onClick={toggleLoginModal}>Login</button>
        {showLoginModal && <LoginModal />}
      </Root>
    );
  }
}

export default inject('store')(observer(Header));
