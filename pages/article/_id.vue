<template>
  <div>
    {{ article }}
  </div>
</template>

<script>
import { http } from '../../util/http';
export default {
  async asyncData({ params, redirect }) {
    try {
      const { data } = await http.get(`/articles/${params.id}`);
      return { article: data };
    } catch (e) {
      return redirect('/login');
    }
  },
};
</script>

