import React from 'react';
import LoginModal from '../LoginModal';
import { Button, Box } from 'grommet';

interface State {
  showModal: boolean;
}

class Header extends React.Component<{}, State> {
  state = {
    showModal: false,
  };

  componentDidMount() {
    //
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;

    return (
      <Box direction="row" pad="small">
        {showModal && <LoginModal onClose={this.closeModal} />}
        <Button label="登陆" primary onClick={this.openModal} />
      </Box>
    );
  }
}

export default Header;
