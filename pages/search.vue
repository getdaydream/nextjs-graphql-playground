<template>
  <div class="container">
    <el-input
      v-model="queryString"
      placeholder="请输入名称"
      class="input-with-select"
      @keyup.enter.native="search">
      <el-select
        slot="prepend"
        v-model="select"
        style="width:80px;"
        placeholder="请选择">
        <el-option
          label="电影"
          value="1"/>
        <el-option
          label="图书"
          value="2"/>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"/>
    </el-input>

    <div class="result">
      <item-detail-head
        v-for="item in items"
        :key="item.id"
        :item="item"
        :category="$route.query.c"
        class="result-item"/>
    </div>
  </div>
</template>

<script>
import ItemDetailHead from '../components/item-detail-head.vue';
import { request } from '../util/request';

export default {
  name: 'Search',
  async asyncData({ query }) {
    let category;
    if (!query.c) {
      category = 'movie';
    } else {
      category = query.c;
    }
    const { data: items } = await request(
      `/${category}s/search?q=${encodeURIComponent(query.q)}`,
    );
    return { items };
  },
  components: {
    ItemDetailHead,
  },
  data() {
    return {
      queryString: '',
      select: '1',
    };
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        if (!query.c) {
          this.select = 'movie';
        } else {
          this.select = query.c === 'movie' ? '1' : '2';
        }
        this.queryString = query.q;
      },
    },
  },
  methods: {
    async search() {
      const category = this.select === '1' ? 'movie' : 'book';
      const { data: items } = await request(
        `/${category}s/search?q=${encodeURIComponent(this.$route.query.q)}`,
      );
      this.items = items;
      this.$router.push(`/search?q=${this.queryString}&c=${category}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/search.scss';
</style>
