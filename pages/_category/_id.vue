<template>
  <div class="resource-item">
    <item-detail-head
      :item="item"
      :category="$route.params.category"/>
    <div class="movie-operation">
      <div class="buttons has-addons">
        <nuxt-link
          v-if="$route.params.category === 'book'"
          :to="`/annotation/new?sid=${$route.params.id}`"
          class="button">
          写笔记
        </nuxt-link>
        <nuxt-link
          :to="`/article/new?category=${$route.params.category}&id=${$route.params.id}`"
          class="button">
          发表评价
        </nuxt-link>
        <nuxt-link
          :to="`/${$route.params.category}/${$route.params.id}/upload`"
          class="button">
          上传图片
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../util/request';
import ItemDetailHead from '../../components/item-detail-head.vue';

export default {
  name: 'ResourceItem',
  validate({ params, query }) {
    const categories = ['book', 'movie'];
    if (categories.indexOf(params.category) === -1) {
      return false;
    }
    return true;
  },
  async asyncData({ params, req, redirect }) {
    try {
      const { data } = await request.get(`/${params.category}s/${params.id}`);
      return { item: data };
    } catch (e) {
      return redirect('/login');
    }
  },
  components: {
    ItemDetailHead,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/resource-item.scss';
</style>

