import MonacoEditor from '@/components/MonacoEditor';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import classnames from 'classnames';
import React from 'react';
import styles from './GistEdit.module.scss';

interface Props {
  gist: any;
}

class NewGistDialog extends React.Component<Props> {
  public title = '';
  public description = '';

  public render() {
    return (
      <div>
        <Button text="保存" intent={Intent.PRIMARY} />

        <div className={classnames(styles.dialogBody)}>
          <FormGroup label="Gist Title">
            <InputGroup />
          </FormGroup>
          <FormGroup label="Description">
            <TextArea fill={true} />
          </FormGroup>
          <FormGroup label="Files">
            <MonacoEditor
              value={
                "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line"
              }
              language="typescript"
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default NewGistDialog;
