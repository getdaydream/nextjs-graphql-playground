import React from 'react';
import BraftEditor from '@/components/BraftEditor';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Input } from 'antd';
import { compose } from 'react-apollo';
import { inject, observer } from 'mobx-react';
import { IStore } from '@/stores';

interface ArticleFormProps extends FormComponentProps {
  title: string;
  store: IStore;
}

// https://github.com/zeit/next.js#shallow-routing
class ArticleEdit extends React.Component<ArticleFormProps> {
  componentDidMount() {
    const { initArticleEdit } = this.props.store;
    initArticleEdit();
  }

  componentWillMount() {
    const { destoryArticleEdit } = this.props.store;
    destoryArticleEdit();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form>
          <Form.Item>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '长度' }],
            })(<Input size="large" />)}
          </Form.Item>
        </Form>

        <BraftEditor />
      </div>
    );
  }
}

export default compose(
  inject((store: IStore) => store),
  Form.create(),
)(observer(ArticleEdit));
