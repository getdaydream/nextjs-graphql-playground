import MonacoEditor from '@/components/MonacoEditor';
import { postActions } from '@/store/post';
import { Post } from '@/store/post/interface';
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
  gist: Post;
  onUpdate: (gist: Partial<Post>) => void;
  onCreate: (gist: Partial<Post>) => void;
  onChange: (gist: Partial<Post>) => void;
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
    const { gist, onCreate, onUpdate } = this.props;
    if (gist.id) {
      onUpdate(gist);
    } else {
      onCreate(gist);
    }
  };

  public handleChangeEditorContent = (index: number, value: string) => {
    const { gist, onChange } = this.props;
    const newFiles = [...gist.files];
    const newFile = { ...newFiles[index], content: value };
    newFiles[index] = newFile;
    onChange({
      files: newFiles,
    });
  };

  public render() {
    const { gist } = this.props;

    return (
      <div>
        <Button
          text="Save"
          intent={Intent.PRIMARY}
          onClick={this.handleClickSave}
        />

        <div className={classnames(styles.dialogBody)}>
          <FormGroup label="Title">
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
              <MonacoEditor
                value={f.content}
                language={f.filetype}
                onChangeContent={value =>
                  this.handleChangeEditorContent(index, value)
                }
              />
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
    gist: state.post.currentPost,
  }),
  {
    onAddFile: postActions.addFileToCurrentEditGistAction,
    onChange: postActions.updateCurrentEditPostAction,
    onCreate: postActions.newPostRequestAction,
    onUpdate: postActions.updatePostRequestAction,
  },
)(GistEdit);
