<template>
  <section class="section">
    <div class="container">
      <h1 class="is-size-1 has-text-centered"> {{ article.title }} </h1>
      <div
        class="article-content"
        v-html="articleHtml"/>
    </div>
  </section>
</template>

<script>
import { request } from '../../util/request';
import marked from 'marked';
export default {
  async asyncData({ params, redirect }) {
    try {
      const { data } = await request.get(`/articles/${params.id}`);
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
