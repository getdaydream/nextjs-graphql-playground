import React from 'react';
import cookie from 'cookie';
import { Layer, Button } from 'grommet';
import { withApollo, WithApolloClient } from 'react-apollo';
import { QueryLoginResult } from '@/graphql/user';
import {
  IQueryLoginResult,
  IQueryLoginResultVariables,
} from '@/graphql/__generated-types__';

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
      data,
    } = await client.query<IQueryLoginResult, IQueryLoginResultVariables>({
      query: QueryLoginResult,
      variables: { email: '1@qq.com', password: '12345678' },
    });
    console.log(data);
    client.writeQuery({
      query: QueryLoginResult,
      data,
    });
    document.cookie = cookie.serialize('token', token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    onClose();
  };

  render() {
    const { onClose } = this.props;

    return (
      <Layer onEsc={onClose} onClickOutside={onClose}>
        <Button label="登陆" primary onClick={this.handleClickLogin} />
      </Layer>
    );
  }
}

export default withApollo(LoginModal);
