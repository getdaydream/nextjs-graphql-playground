import AppHeader from '@/components/AppHeader';
import { Button } from '@material-ui/core';
import React, { Fragment } from 'react';
import CodeEditor from './StackBlitz';

class CodePen extends React.Component {
  public render() {
    // const HeaderContent = () => <div />;

    return (
      <Fragment>
        <AppHeader>
          <Button variant="contained" color="primary">
            保存
          </Button>
        </AppHeader>
        <CodeEditor />
      </Fragment>
    );
  }
}

export default CodePen;
