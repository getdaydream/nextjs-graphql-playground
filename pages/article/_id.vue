<template>
  <div class="container">
    <h1 class="article-title"> {{ article.title }} </h1>
    <div
      v-html="articleHtml"
      class="article-content"/>
  </div>
</template>

<script>
import { http } from '../../util/http';
import marked from 'marked';
export default {
  async asyncData({ params, redirect }) {
    try {
      const { data } = await http.get(`/articles/${params.id}`);
      data.html = marked(data.content);
      return { article: data };
    } catch (e) {
      return redirect('/login');
    }
  },
  computed: {
    articleHtml() {
      return marked(this.article.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  &-title {
    word-break: break-word;
  }

  &-content {
    margin-top: 20px;
  }
}
</style>
