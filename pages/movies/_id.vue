<template>
  <div>
    <object-detail-head
      :id="movie.id"
      :cover="movie.cover"
      :rating-count="movie.ratingCount"
      :rating-value="movie.ratingValue"
      :title="movie.title + ' ' + movie.originalTitle"
      :year="movie.year"/>
  </div>
</template>

<script>
import {http} from '../../util/http';
import ObjectDetailHead from '../../components/object-detail-head.vue'

export default {
 async asyncData ({params, req}) {
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
   const {data} = await http.get(`/movies/${params.id}`)
   return {movie: data}
  },
  components: {
    ObjectDetailHead,
  },
  data() {
    return {
    }
  },
}
</script>
