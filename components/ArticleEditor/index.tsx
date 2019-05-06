import React from 'react';
import BaseEditor, { BraftEditorProps } from 'braft-editor';
import 'braft-editor/dist/index.css';

interface Props extends BraftEditorProps {}

const ArticleEditor: React.FC<Props> = props => {
  return <BaseEditor {...props} value=""/>;
};

export default ArticleEditor;
