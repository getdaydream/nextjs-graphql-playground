<template>
  <div>
    <div>id</div>
    <div>{{ movie.title }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
 async asyncData ({params}) {
    const {data:movie} = await axios.get(`http://127.0.0.1:3001/api/movies/${params.id}`);
    return {movie}
  },
  data() {
    return {
      movie: {}
    }
  }
}
</script>
