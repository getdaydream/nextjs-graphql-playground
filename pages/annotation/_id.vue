<template>
  <div class="container">
    <div>Position</div>
    <div>{{ annotation.position }}</div>
    <div>Content</div>
    <div>{{ annotation.content }}</div>
    <div>Comment</div>
    <div>{{ annotation.comment }} </div>
  </div>
</template>

<script>
import { http } from '../../util/http';

export default {
  async asyncData({ params, redirect }) {
    try {
      const { data } = await http.get(`/annotation/${params.id}`);
      return { annotation: data };
    } catch (e) {
      return redirect('/login');
    }
  },
};
</script>
