// import MonacoEditor from '@/components/MonacoEditor';
import { IPost } from '@/store/post/interface';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import classnames from 'classnames';
import React, { Fragment } from 'react';
import styles from './SnippetEdit.module.scss';

interface Props {
  post: IPost;
  onUpdate: (gist: Partial<IPost>) => void;
  onCreate: (gist: Partial<IPost>) => void;
  onChange: (gist: Partial<IPost>) => void;
  onAddFile: () => void;
}

class SnippetEdit extends React.Component<Props> {
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
    const { post, onCreate, onUpdate } = this.props;
    if (post.id) {
      onUpdate(post);
    } else {
      onCreate(post);
    }
  };

  public handleChangeEditorContent = (index: number, value: string) => {
    // const { post, onChange } = this.props;
    // const newFiles = [...post.files];
    // const newFile = { ...newFiles[index], content: value };
    // newFiles[index] = newFile;
    // onChange({
    //   files: newFiles,
    // });
  };

  public render() {
    const { post } = this.props;

    return (
      <Fragment>
        <Button
          text="Save"
          intent={Intent.PRIMARY}
          onClick={this.handleClickSave}
        />

        <div className={classnames(styles.dialogBody)}>
          <FormGroup label="Title">
            <InputGroup value={post.title} onChange={this.handleChangeTitle} />
          </FormGroup>
          <FormGroup label="Description">
            <TextArea
              fill={true}
              value={post.description}
              onChange={this.handleChangeDesc}
            />
          </FormGroup>

          {/* {post.files.map((f, index) => (
            <div className={styles.fileEditor} key={index}>
              <MonacoEditor
                value={f.content}
                language={f.filetype}
                onChangeContent={value =>
                  this.handleChangeEditorContent(index, value)
                }
              />
            </div>
          ))} */}

          <Button
            text="add file"
            intent={Intent.PRIMARY}
            onClick={this.handleClickAddFile}
          />
        </div>
      </Fragment>
    );
  }
}

export default SnippetEdit;
