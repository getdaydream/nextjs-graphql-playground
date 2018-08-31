<template>
  <section class="section">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">

    <div class="container">
      <button
        class="button"
        @click="save">保存</button>
      <button
        v-if="article && !article.published"
        type="button"
        class="button is-danger"
        @click="publish">发布</button>

      <b-input
        v-model="title"
        type="text"
        placeholder="点此输入标题"
        maxlength="30"
        size="is-medium"
        @blur="handleTitleInputBlur"/>

      <textarea id="markdown-editor"/>

      <b-taginput
        v-model="tags"
        :data="filteredTags"
        :allow-new="true"
        autocomplete
        field="name"
        icon="label"
        placeholder="添加标签"
        class="tag-input"
        @typing="getFilteredTags"/>
    </div>
  </section>
</template>

<script>
import { request } from '../../util/request';

export default {
  validate({ query, route }) {
    // 新建文章参数验证
    if (!query.category) {
      return true;
    }
    if (!query.id) {
      return false;
    }
    const categories = ['book', 'movie'];
    if (categories.indexOf(query.category) === -1) {
      return false;
    }
    // TODO 编辑文章id必须为数字
    return true;
  },
  async asyncData({ route, params }) {
    const { data } = await request.get('/tags');
    const tagOptions = data;

    if (route.name === 'article-edit') {
      const articleId = params.id;
      if (!articleId) {
        return;
      }
      const { data } = await request.get(`/articles/${articleId}`);
      const tags = data.tags.map(v => v.id);
      return { article: data, tagOptions, tags };
    }
    return { article: null, tagOptions };
  },
  data() {
    this.simplemde = null;
    return {
      title: '',
      requesting: false,
      tags: [],
      filteredTags: [],
    };
  },
  computed: {
    content() {
      return this.simplemde.value();
    },
  },
  async mounted() {
    let initialValue = '';
    if (this.$route.name === 'article-edit') {
      this.title = this.article.title;
      initialValue = this.article.content;
    }
    const SimpleMDE = require('simplemde');
    this.simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      initialValue,
    });

    this.filteredTags = this.tagOptions;
  },
  methods: {
    async handleTitleInputBlur() {
      if (this.$route.name === 'article-new') {
        if (this.title) {
          if (this.requesting) return;
          this.requesting = true;
          const { data } = await request.post('/articles', {
            title: this.title,
            content: this.content,
            tags: this.tags,
            category: this.$route.query.category || 'default',
            resourceId: this.$route.query.id || 0,
          });
          this.$router.replace(`/article/${data.id}/edit`);
        }
      }
    },
    async save() {
      const params = {
        id: this.$route.params.id,
        title: this.title,
        content: this.content,
        tags: this.tags,
      };
      const { data } = await request.put(
        '/articles/' + this.$route.params.id + '/update',
        params,
      );
    },
    async publish() {
      const { data } = await request.put(
        '/articles/' + this.$route.params.id + '/publish',
        { id: this.$route.params.id },
      );
      this.$router.push('/article/' + this.$route.params.id);
    },
    getFilteredTags(text) {
      this.filteredTags = this.tagOptions.filter(v => {
        return v.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    },
    async tagsChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/article-new.scss';
</style>


<style lang="scss">
.editor-toolbar {
  background: white;
}

.editor-statusbar {
  background: white;
}

.CodeMirror {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
