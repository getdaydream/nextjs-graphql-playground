import MonacoEditor from '@/components/MonacoEditor';
import { gistActions } from '@/store/gist';
import { Gist } from '@/store/gist/reducer';
import { ReduxStore } from '@/store/store';
import axios from '@/utils/axios';
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
  onUpdate: (gist: Partial<Gist>) => void;
  onCreate: (gist: Partial<Gist>) => void;
  onChange: (gist: Partial<Gist>) => void;
  onAddFile: () => void;
}

class GistEdit extends React.Component<Props> {
  public handleClickAddFile = () => {
    const { onAddFile } = this.props;
    onAddFile();
  };

  public handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange({
      title: e.currentTarget.value,
    });
  };

  public handleChangeDesc = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange({
      description: e.currentTarget.value,
    });
  };

  public handleClickSave = () => {
    axios.post('/api/gists', {});

    // const { gist, onCreate, onUpdate } = this.props;
    // if (gist.id) {
    //   onUpdate(gist);
    // } else {
    //   onCreate(gist);
    // }
  };

  public render() {
    const { gist } = this.props;

    return (
      <div>
        <Button
          text="保存"
          intent={Intent.PRIMARY}
          onClick={this.handleClickSave}
        />

        <div className={classnames(styles.dialogBody)}>
          <FormGroup label="Gist Title">
            <InputGroup value={gist.title} onChange={this.handleChangeTitle} />
          </FormGroup>
          <FormGroup label="Description">
            <TextArea
              fill={true}
              value={gist.description}
              onChange={this.handleChangeDesc}
            />
          </FormGroup>

          {gist.files.map((f, index) => (
            <div className={styles.fileEditor} key={index}>
              <MonacoEditor value={f.content} language={f.filetype} />
            </div>
          ))}

          <Button
            text="添加文件"
            intent={Intent.PRIMARY}
            onClick={this.handleClickAddFile}
          />
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
    onAddFile: gistActions.addFileToCurrentEditGistAction,
    onChange: gistActions.updateCurrentEditGistAction,
    onCreate: gistActions.newGistRequestAction,
    onUpdate: gistActions.updateGistRequestAction,
  },
)(GistEdit);
