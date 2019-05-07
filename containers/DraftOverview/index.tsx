import React from 'react';
import { Box } from 'grommet';
import { observer, inject } from 'mobx-react';
import { MstStoreProps } from '@/stores';

class DraftOverview extends React.Component<MstStoreProps> {
  render() {
    return <Box />;
  }
}

export default inject(store => store)(observer(DraftOverview));
