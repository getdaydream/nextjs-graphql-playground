import React from 'react';
import ArticleEditor from '@/components/ArticleEditor';
import { Input, Icon } from 'antd';
import { Box } from 'grommet';
import { Button } from 'antd';
import { Portal } from 'react-portal';
import { setGlobalOverlay } from '@/store/UI/global/actions';
import { connect } from 'react-redux';

const dispatchProps = {
  setGlobalOverlay,
};

type ArticleEditProps = typeof dispatchProps;

// https://github.com/zeit/next.js#shallow-routing
const ArticleEdit: React.FC<ArticleEditProps> = ({ setGlobalOverlay }) => {
  // const [];

  return (
    <Portal>
      <Box pad="large" background="light-3">
        <Box direction="row" justify="end" pad="small">
          <Icon type="cross" onClick={() => setGlobalOverlay('')} />
        </Box>

        {/* {draft.updateTime && <Box>上次保存时间: {draft.updateTime}</Box>} */}

        {/* {draft.id && <Button onClick={pushlishArticle}>发布</Button>} */}

        <Button
          //  onClick={this.saveArticle}
          size="default"
        >
          保存
        </Button>

        <Input
          size="large"
          // value={draft.title}
          // onChange={e =>
          //   updateArticle({ ...draft, title: e.currentTarget.value })
          // }
        />

        <ArticleEditor
        // value={BraftEditor.createEditorState(draft.content)}
        // onChange={this.handleChangeContent}
        />
      </Box>
    </Portal>
  );
};

export default connect(
  null,
  dispatchProps,
)(ArticleEdit);
