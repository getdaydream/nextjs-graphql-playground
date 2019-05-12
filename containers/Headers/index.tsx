import React from 'react';
import { Box } from 'grommet';
import { Button, Avatar } from 'antd';
import { Query } from 'react-apollo';
import { QueryMe } from '@/graphql/user';
import { IQueryMe } from '@/graphql/__generated-types__';

const Header: React.FC = () => {
  return (
    <Box direction="row" pad="small" style={{ background: 'white' }}>
      <Query<IQueryMe> query={QueryMe}>
        {({ data }) => {
          if (data && data.me) {
            return (
              <Box direction="row" justify="between" fill>
                <div />
                <Box direction="row" justify="end" align="center">
                  <Button>Just for test Post</Button>
                  <Avatar />
                </Box>
              </Box>
            );
          }

          return <Button>登录</Button>;
        }}
      </Query>
    </Box>
  );
};

export default Header;
