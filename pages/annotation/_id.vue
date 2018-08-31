<template>
  <section class="section">
    <div class="container">
      <div>Position</div>
      <div>{{ annotation.position }}</div>
      <div>Content</div>
      <div>{{ annotation.content }}</div>
      <div>Comment</div>
      <div>{{ annotation.comment }} </div>
    </div>
  </section>
</template>

<script>
import { request } from '../../util/request';

export default {
  async asyncData({ params, redirect }) {
    try {
      const { data } = await request.get(`/annotation/${params.id}`);
      return { annotation: data };
    } catch (e) {
      return redirect('/login');
    }
  },
};
</script>
