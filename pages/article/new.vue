<template>
  <div class="container">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">

    <el-select
      v-model="tags"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="请选择文章标签"
      @change="tagsChange">
      <el-option
        v-for="tag in tagOptions"
        :key="tag.id"
        :label="tag.name"
        :value="tag.id"/>
    </el-select>

    <button
      type="button"
      class="btn btn-light"
      @click="save">保存</button>
    <button
      v-if="article && !article.published"
      type="button"
      class="btn btn-danger"
      @click="publish">发布</button>


    <div class="input-group mb-3">
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="点此输入标题"
        @blur="handleTitleInputBlur">
    </div>
    <textarea id="markdown-editor"/>
  </div>
</template>

<script>
import { http } from '../../util/http';

export default {
  validate({ query }) {
    if (!query.category) {
      return true;
    }
    if (!query.id) {
      return false;
    }
    const categories = ['book', 'movie'];
    if (categories.indexOf(query.category) === 1) {
      return false;
    }
    return true;
  },
  async asyncData({ route, params }) {
    const { data } = await http.get('/tags');
    const tagOptions = data;

    if (route.name === 'article-edit') {
      const articleId = params.id;
      if (!articleId) {
        return;
      }
      const { data } = await http.get(`/articles/${articleId}`);
      const tags = data.tags.map(v => v.id);
      return { article: data, tagOptions, tags };
    }
    return { article: null, tagOptions };
  },
  async mounted() {
    let initialValue = '';
    if (this.$route.name === 'article-edit') {
      this.title = this.article.title;
      initialValue = this.article.content;
    }
    import('bootstrap');
    const SimpleMDE = require('simplemde');
    this.simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      initialValue,
    });
  },
  data() {
    this.simplemde = null;
    return {
      title: '',
      requesting: false,
      tags: [],
    };
  },
  computed: {
    content() {
      return this.simplemde.value();
    },
  },
  methods: {
    async handleTitleInputBlur() {
      if (this.$route.name === 'article-new') {
        if (this.title) {
          if (this.requesting) return;
          this.requesting = true;
          const { data } = await http.post('/articles', {
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
      const { data } = await http.put(
        '/articles/' + this.$route.params.id + '/update',
        params,
      );
    },
    async publish() {
      const { data } = await http.put(
        '/articles/' + this.$route.params.id + '/publish',
        { id: this.$route.params.id },
      );
      this.$router.push('/article/' + this.$route.params.id);
    },
    async tagsChange(value) {
      console.log(value);
    },
  },
};
</script>

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
