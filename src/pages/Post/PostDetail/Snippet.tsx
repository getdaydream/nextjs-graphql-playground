import MonacoEditor from '@/components/MonacoEditor';
import { Post, PostFile } from '@/store/post.interface';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Spinner,
  TextArea,
} from '@blueprintjs/core';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import React, { Fragment } from 'react';
import styles from './Snippet.module.scss';

interface InjectProps {
  post: Post;
  files: PostFile[] | undefined;
  updatePost: (newPost: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<boolean>;
}

interface OwnProps {
  onAddFile?: () => void;
}

@observer
class Snippet extends React.Component<OwnProps & InjectProps> {
  public handleClickAddFile = () => {
    // const { post, updatePost } = this.props;
    // const defaultFile = {
    //   content: '',
    //   filename: 'index',
    //   filetype: 'typescript',
    // } as PostFile;
    // const params = {
    //   files: [...post.files, defaultFile],
    //   id: post.id,
    // };
    // updatePost(params);
  };

  public handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    // const { onChange } = this.props;
    // onChange({
    //   title: e.currentTarget.value,
    // });
  };

  public handleChangeDesc = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // const { onChange } = this.props;
    // onChange({
    //   description: e.currentTarget.value,
    // });
  };

  public handleClickSave = () => {
    // const { post, onCreate, onUpdate } = this.props;
    // if (post && post.id) {
    //   onUpdate(post);
    // } else {
    //   onCreate(post!);
    // }
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

  public deletePostFile = (fileId: number) => {
    // const { updatePost, post } = this.props;
    // const params = {
    //   files: post.files.filter(p => p.id !== fileId),
    //   id: post.id,
    // };
    // updatePost(params);
  };

  public handleClickDelete = () => {
    const { deletePost, post } = this.props;
    deletePost(post.id);
  };

  public render() {
    const { post, files } = this.props;

    if (!files) {
      return <Spinner size={Spinner.SIZE_STANDARD} />;
    }

    return (
      <Fragment>
        <Button
          text="Save"
          intent={Intent.PRIMARY}
          onClick={this.handleClickSave}
        />
        <Button
          text="Delete"
          intent={Intent.DANGER}
          onClick={this.handleClickDelete}
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

          {files.map((f, index) => (
            <Fragment key={f.id || String(index)}>
              <Button text="delete" onClick={() => this.deletePostFile(f.id)} />
              <div className={styles.fileEditor}>
                <MonacoEditor
                  value={f.content}
                  language={f.filetype}
                  onChangeContent={value =>
                    this.handleChangeEditorContent(index, value)
                  }
                />
              </div>
            </Fragment>
          ))}

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

export default inject(store => ({
  deletePost: store.post.deletePost,
  files: store.post.currentFiles,
  post: store.post.currentPost,
  updatePost: store.post.updatePost,
}))(Snippet);
