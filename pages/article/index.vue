<template>
  <section class="section">
    <div class="container">
      <article-card
        v-for="(article,index) in articles"
        :key="index"
        :article="article"/>
    </div>
  </section>
</template>

<script>
import ArticleCard from '../../components/article-card.vue';
import { request } from '../../util/request';

export default {
  async asyncData({ redirect }) {
    try {
      const { data } = await request.get(`/articles`);
      return { articles: data };
    } catch (e) {
      return redirect('/login');
    }
  },
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: [1, 2],
    };
  },
};
</script>
