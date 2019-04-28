import React from 'react';
import LoginModal from '../LoginModal';
import { Button, Box } from 'grommet';
import { withMe } from '@/graphql/user';
import { compose } from 'react-apollo';

interface State {
  showModal: boolean;
}

class Header extends React.Component<{}, State> {
  state = {
    showModal: false,
  };

  componentDidMount() {}

  openModal = () => {
    this.setState({ showModal: true });
    console.log(this.props);
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

export default compose(withMe)(Header);
