import { Gist } from '@/store/gist/reducer';
import React from 'react';

interface Props extends Gist {
  hover: boolean;
}

class GistListItem extends React.Component<Props> {
  public render() {
    return <div />;
  }
}

export default GistListItem;
