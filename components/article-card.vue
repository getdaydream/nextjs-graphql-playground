<template>
  <div class="box">
    <article>
      <div class="has-text-grey-light level">
        <div class="level-left">来自：</div>
        <div class="level-right">{{ timeAgo }}</div>
      </div>
      <nuxt-link :to="`/article/${article.id}`">
        <div>  {{ article.title }} </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import { dayjs } from '../util/dayjs';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timeAgo() {
      return dayjs(this.article.updateAt).fromNow();
    },
  },
};
</script>
