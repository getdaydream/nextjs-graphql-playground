<template>
  <div>
    <div>id</div>
    <div>{{ movie }}</div>
  </div>
</template>

<script>
import cookie from 'cookie';
import {http} from '../../common/http'
import store from '../../store';
import axios from 'axios'

export default {
 async asyncData ({params, req}) {
   const cookies = cookie.parse(req.headers.cookie)
   if (cookies.token) {
     const {data} = await axios({
       method: 'GET',
       url: 'http://127.0.0.1:3001/api/movies/' + params.id,
       headers: {
         Authorization: 'Bearer ' + cookies.token
       }
     })
     return {movie:data}
   }
  },
  data() {
    return {
    }
  },
  async mounted() {
    const {data} = await axios({
       method: 'GET',
       url: 'http://127.0.0.1:3001/api/movies/' + this.$route.params.id,
       withCredentials: true
     })
     console.log(data)
  }
}
</script>
