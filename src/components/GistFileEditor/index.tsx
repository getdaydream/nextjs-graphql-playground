import React from 'react';
import MonacoEditor, { MonacoEditorProps } from '../MonacoEditor';

interface Props extends MonacoEditorProps {
  showDelete?: boolean;
}

class GistFileEditor extends React.Component<Props> {
  public render() {
    return (
      <div>
        <div />
        <MonacoEditor />
      </div>
    );
  }
}

export default GistFileEditor;
