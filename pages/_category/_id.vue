<template>
  <div class="resource-item">
    <item-detail-head
      :item="item"
      :category="$route.params.category"
      class="shadow"/>
    <div class="movie-operation">
      <nuxt-link :to="`/annotation/new?sid=${$route.params.id}`">
        <app-button>写笔记</app-button>
      </nuxt-link>
      <nuxt-link :to="`/article/new?category=${$route.params.category}&id=${$route.params.id}`">
        <app-button>发表评价</app-button>
      </nuxt-link>
      <nuxt-link :to="`/${$route.params.category}/${$route.params.id}/upload`">
        <app-button>上传图片</app-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { http } from '../../util/http';
import ItemDetailHead from '../../components/item-detail-head.vue';
import AppButton from '../../components/app-button.vue';

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
      const { data } = await http.get(`/${params.category}s/${params.id}`);
      return { item: data };
    } catch (e) {
      return redirect('/login');
    }
  },
  components: {
    ItemDetailHead,
    AppButton,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/resource-item.scss';
</style>

