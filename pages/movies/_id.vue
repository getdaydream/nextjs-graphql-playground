<template>
  <div>
    <div>id</div>
    <div>{{ movie.title }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../../store';

export default {
 async asyncData ({params, req}) {
   console.error(req.headers)
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
