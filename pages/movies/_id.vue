<template>
  <div class="movie">
    <object-detail-head
      :id="movie.id"
      :cover="movie.cover"
      :rating-count="movie.ratingCount"
      :rating-value="movie.ratingValue"
      :title="movie.title + ' ' + movie.originalTitle"
      :year="movie.year"
      class="shadow"/>
    <div class="movie-operation">
      <nuxt-link :to="`/article/new?category=movie&id=${$route.params.id}`">
        <app-button>发表评价</app-button>
      </nuxt-link>
      <app-button>上传图片</app-button>
    </div>
  </div>
</template>

<script>
import { http } from '../../util/http';
import ObjectDetailHead from '../../components/object-detail-head.vue';
import AppButton from '../../components/app-button.vue';

export default {
  async asyncData({ params, req, redirect }) {
    //  const cookies = cookie.parse(req.headers.cookie)
    //  if (cookies.token) {
    //    const {data} = await axios({
    //    method: 'GET',
    //      url: 'http://127.0.0.1:3001/api/movies/' + params.id,
    //      headers: {
    //        Authorization: 'Bearer ' + cookies.token
    //      }
    //    })
    //  }
    try {
      const { data } = await http.get(`/movies/${params.id}`);
      return { movie: data };
    } catch (e) {
      return redirect('/login');
    }
  },
  components: {
    ObjectDetailHead,
    AppButton,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/movie.scss';
</style>

