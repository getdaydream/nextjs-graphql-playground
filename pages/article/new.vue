<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">

    <button
      type="button"
      class="btn btn-light"
      @click="save">保存</button>
    <button
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
  async mounted() {
    import('bootstrap');
    const SimpleMDE = require('simplemde');
    this.simplemde = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
    });

    if (this.$route.name === 'article-edit') {
      const articleId = this.$route.params.id;
      if (!articleId) {
        return;
      }
      const { data } = await http.get(`/articles/${articleId}`);
      this.title = data.title;
      this.simplemde.value(data.content);
      console.log(data);
    }
  },
  data() {
    this.simplemde = null;
    return {
      title: '',
      requesting: false,
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
          });
          this.$router.replace(`/article/${data.id}/edit`);
        }
      }
    },
    async save() {
      const { data } = await http.put(
        '/articles/' + this.$route.params.id + '/edit',
        {
          id: this.$route.params.id,
          title: this.title,
          content: this.content,
        },
      );
    },
    async publish() {
      const { data } = await http.put(
        '/articles/' + this.$route.params.id + '/publish',
        { id: this.$route.params.id },
      );
      this.$router.push('/article/' + this.$route.params.id);
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
