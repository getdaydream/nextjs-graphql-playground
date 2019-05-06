import React from 'react';
import ArticleEditor from '@/components/ArticleEditor';
import { Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { IStore, MstStoreProps } from '@/stores';
import { Box } from 'grommet';
import BraftEditor from 'braft-editor';
import { Button } from 'antd';
import { gqClient } from '@/utils/init-apollo-client';
import { MutationCreateArticle } from '@/graphql/article';
import {
  IMutationCreateArticle,
  IMutationCreateArticleVariables,
  IMutationUpdateArticle,
  IMutationUpdateArticleVariables,
} from '@/graphql/__generated-types__';
import { ArticleFormatEnum } from '@/utils/enum';
import { compose } from 'react-apollo';
import Router, { withRouter, RouterProps } from 'next/router';

// https://github.com/zeit/next.js#shallow-routing
class ArticleEdit extends React.Component<MstStoreProps & RouterProps> {
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

  createArticle = async () => {
    const {
      draft: { title },
      updateArticle,
    } = this.props.store.articleEdit!;
    const {
      data: { createArticle },
    } = await gqClient.mutate<
      IMutationCreateArticle,
      IMutationCreateArticleVariables
    >({
      mutation: MutationCreateArticle,
      variables: {
        createArticleInput: {
          format: ArticleFormatEnum.RichText,
          title,
          content: this.editorState.toHTML(),
        },
      },
    });
    updateArticle(createArticle);
    const href = `/post/${createArticle.id}/edit`;
    Router.push(href, href, { shallow: true });
  };

  updateArticle = async () => {
    const {
      draft: { title, id },
      updateArticle,
    } = this.props.store.articleEdit!;
    const {
      data: { createArticle },
    } = await gqClient.mutate<
      IMutationUpdateArticle,
      IMutationUpdateArticleVariables
    >({
      mutation: MutationCreateArticle,
      variables: {
        updateArticleInput: {
          id: id!,
          title,
          content: this.editorState.toHTML(),
        },
      },
    });
    updateArticle(createArticle);
  };

  render() {
    const { articleEdit } = this.props.store;
    if (!articleEdit) {
      return null;
    }

    const { draft, updateArticle } = articleEdit;

    return (
      <Box pad="large" background="light-3">
        <Button
          onClick={draft.id ? this.updateArticle : this.createArticle}
          size="default"
        >
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
    );
  }
}

export default compose(
  inject((store: IStore) => store),
  withRouter,
)(observer(ArticleEdit));
