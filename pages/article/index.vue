<template>
  <section class="section">
    <div class="container">
      <article-card
        v-for="(article,index) in articles"
        :key="index"/>
    </div>
  </section>
</template>

<script>
import ArticleCard from '../../components/article-card.vue';

export default {
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: [1,2],
    };
  },
};
</script>
