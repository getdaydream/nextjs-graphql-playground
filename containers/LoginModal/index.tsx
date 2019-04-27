import React from 'react';
import cookie from 'cookie';
import gql from 'graphql-tag';
import { Layer, Button } from 'grommet';
import { withApollo, WithApolloClient } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';

interface Props {
  onClose: () => void;
}

type PropsInternal = WithApolloClient<Props>;

class LoginModal extends React.Component<PropsInternal> {
  handleClickLogin = async () => {
    const { client, onClose } = this.props;
    const {
      data: {
        login: { token },
      },
    } = await client.query({
      query: gql`
        {
          login(email: "1@qq.com", password: "12345678") {
            token
          }
        }
      `,
    });
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    console.log(token);
    onClose();
  };

  render() {
    return (
      <Layer>
        <Button label="登陆" primary onClick={this.handleClickLogin} />
      </Layer>
    );
  }
}

export default withApollo(LoginModal);
