import React, { useState } from 'react';
import LoginModal from '../LoginModal';
import { Button, Box } from 'grommet';
import { Query } from 'react-apollo';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box direction="row" pad="small" style={{ background: 'white' }}>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}

      <Query<IQueryMe> query={QueryMe}>
        {({ data }) => {
          if (data && data.me) {
            return data.me.nickname;
          }
          return (
            <Button label="登陆" primary onClick={() => setShowModal(true)} />
          );
        }}
      </Query>
    </Box>
  );
};

export default Header;
