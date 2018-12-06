import AppHeader from '@/components/AppHeader';
import React, { Fragment } from 'react';
import CodeEditor from './StackBlitz';

class CodePen extends React.Component {
  public render() {
    // const HeaderContent = () => <div />;

    return (
      <Fragment>
        <AppHeader />
        <CodeEditor />
      </Fragment>
    );
  }
}

export default CodePen;
