/**
 * 参考：
 * https://microsoft.github.io/monaco-editor/api/index.html
 * https://juejin.im/entry/5be64cd95188250f24131913
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { RefObject } from 'react';

// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

interface Props {
  value: string;
  language: string;
}

class MonacoEditor extends React.Component<Props> {
  public containerRef: RefObject<HTMLDivElement>;
  public editor: monaco.editor.IStandaloneCodeEditor;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
  }

  public async componentDidMount() {
    const { value, language } = this.props;

    this.editor = monaco.editor.create(this.containerRef.current!, {
      language,
      value,
    });
  }

  public componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  public render() {
    return (
      <div ref={this.containerRef} style={{ width: '100%', height: 500 }} />
    );
  }
}

export default MonacoEditor;
