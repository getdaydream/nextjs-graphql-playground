import React from 'react';
import ArticleEditor from '@/components/ArticleEditor';
import { Input, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { IStore, MstStoreProps } from '@/stores';
import { Box } from 'grommet';
import BraftEditor from 'braft-editor';
import { Button } from 'antd';
import {
  CreateArticleInput,
  UpdateArticleInput,
} from '@/graphql/__generated-types__';
import { ArticleFormatEnum } from '@/utils/enum';
import { compose } from 'react-apollo';
import { Portal } from 'react-portal';
import { createArticle, updateArticle, pushlishArticle } from './logic';

// https://github.com/zeit/next.js#shallow-routing
class ArticleEdit extends React.Component<MstStoreProps> {
  editorState: any;

  componentDidMount() {
    const { initArticleEdit } = this.props.store;
    initArticleEdit();
  }

  componentWillUnmount() {
    const { destoryArticleEdit } = this.props.store;
    destoryArticleEdit();
  }

  handleChangeContent = (editorState: any) => {
    this.editorState = editorState;
  };

  saveArticle = async () => {
    const {
      draft: { id, title },
    } = this.props.store.articleEdit!;
    if (id) {
      const params: UpdateArticleInput = {
        id,
        title,
        content: this.editorState.toHTML(),
      };
      updateArticle(params);
    } else {
      const params: CreateArticleInput = {
        format: ArticleFormatEnum.RichText,
        title,
        content: this.editorState.toHTML(),
      };
      createArticle(params);
    }
  };

  render() {
    const { articleEdit, destoryArticleEdit } = this.props.store;
    if (!articleEdit) {
      return null;
    }

    const { draft, setArticle: updateArticle } = articleEdit;

    return (
      <Portal>
        <Box pad="large" background="light-3">
          <Box direction="row" justify="end" pad="small">
            <Icon type="cross" onClick={destoryArticleEdit} />
          </Box>

          {draft.updateTime && <Box>上次保存时间: {draft.updateTime}</Box>}

          {draft.id && <Button onClick={pushlishArticle}>发布</Button>}

          <Button onClick={this.saveArticle} size="default">
            保存
          </Button>

          <Input
            size="large"
            value={draft.title}
            onChange={e =>
              updateArticle({ ...draft, title: e.currentTarget.value })
            }
          />

          <ArticleEditor
            value={BraftEditor.createEditorState(draft.content)}
            onChange={this.handleChangeContent}
          />
        </Box>
      </Portal>
    );
  }
}

export default compose(inject((store: IStore) => store))(observer(ArticleEdit));
