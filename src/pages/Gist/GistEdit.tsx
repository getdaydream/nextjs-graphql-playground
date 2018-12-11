import MonacoEditor from '@/components/MonacoEditor';
import { gistActions } from '@/store/gist';
import { Gist } from '@/store/gist/reducer';
import { ReduxStore } from '@/store/store';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import styles from './GistEdit.module.scss';

interface Props {
  gist: Gist;
  onChangeGist: (gist: Partial<Gist>) => void;
}

class GistEdit extends React.Component<Props> {
  public title = '';
  public description = '';

  public render() {
    // const { gist } = this.props;
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

export default connect(
  (state: ReduxStore.state) => ({
    gist: state.gist.currentEditGist,
  }),
  {
    onChangeGist: gistActions.updateCurrentEditGistAction,
  },
)(GistEdit);
