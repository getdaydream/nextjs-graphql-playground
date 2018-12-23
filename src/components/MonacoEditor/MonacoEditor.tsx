/**
 * 参考：
 * https://microsoft.github.io/monaco-editor/api/index.html
 * https://juejin.im/entry/5be64cd95188250f24131913
 * TODO: worker
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { RefObject } from 'react';

export interface MonacoEditorProps {
  value: string;
  onChangeContent: (content: string) => void;
  
  language?: string;
  theme?: 'vs' | 'vs-dark' | 'hc-black';
}

class MonacoEditor extends React.Component<MonacoEditorProps> {
  public static defaultProps: Partial<MonacoEditorProps> = {
    language: 'typescript',
    theme: 'vs-dark',
    value: '',
  };

  // tslint:disable:variable-name
  public __current_value = '';
  public __prevent_trigger_change_event = false;

  public containerRef: RefObject<HTMLDivElement> = React.createRef();
  public editor: monaco.editor.IStandaloneCodeEditor;

  public async componentDidMount() {
    const { value, language, theme, onChangeContent } = this.props;

    this.editor = monaco.editor.create(this.containerRef.current!, {
      automaticLayout: true,
      language,
      theme,
      value,
    });

    if (onChangeContent) {
      this.editor.onDidChangeModelContent(() => {
        // Always refer to the latest value
        this.__current_value = this.editor.getValue();

        // Only invoking when user input changed
        if (!this.__prevent_trigger_change_event) {
          onChangeContent(this.editor.getValue());
        }
      });
    }
  }

  public componentDidUpdate(prevProps: MonacoEditorProps) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value;
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true;
        this.editor.setValue(this.__current_value);
        this.__prevent_trigger_change_event = false;
      }
    }
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
