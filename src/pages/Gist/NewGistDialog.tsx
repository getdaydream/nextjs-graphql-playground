import MonacoEditor from '@/components/MonacoEditor';
import {
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';
import classnames from 'classnames';
import React, { Fragment } from 'react';
import styles from './NewGistDialog.module.scss';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

class NewGistDialog extends React.Component<Props> {
  public renderDialogBody = () => {
    return (
      <Fragment>
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
            language="javascript"
          />
        </FormGroup>
      </Fragment>
    );
  };

  public render() {
    const { isOpen, onClose } = this.props;

    return (
      <Dialog
        isOpen={isOpen}
        title="New Gist"
        onClose={onClose}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        className={classnames(styles.dialog)}
      >
        <div className={classnames(Classes.DIALOG_BODY, styles.dialogBody)}>
          {this.renderDialogBody()}
        </div>
      </Dialog>
    );
  }
}

export default NewGistDialog;
