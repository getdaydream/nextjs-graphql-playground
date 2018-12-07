import 'monaco-editor/esm/vs/editor/contrib/find/findController';
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

  public componentDidMount() {
    const { value, language } = this.props;

    import('monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution').then(
      () => {
        this.editor = monaco.editor.create(this.containerRef.current!, {
          language,
          value,
        });
      },
    );
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
