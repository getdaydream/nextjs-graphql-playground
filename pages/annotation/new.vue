<template>
  <section class="section">
    <div class="container">
      <button
        class="button"
        @click="commit">提交</button>

      <b-input
        v-model="position"
        placeholder="position"
      />

      <b-input
        v-model="content"
        placeholder="content"
        type="textarea"
      />

      <b-input
        v-model="comment"
        placeholder="comment"
        type="textarea"
      />
    </div>
  </section>
</template>

<script>
import { request } from '../../util/request';

export default {
  validate({ query }) {
    if (!query.sid) {
      return false;
    }
    return true;
  },
  data() {
    return {
      position: '',
      content: '',
      comment: '',
    };
  },
  methods: {
    async commit() {
      if (this.content.trim().length < 10) return;
      const params = {
        bookId: this.$route.query.sid,
        position: this.position,
        content: this.content,
        comment: this.comment,
      };
      const { data } = await request.post('/annotation', params);
      console.log(data);
      this.$router.push(`/annotation/${data.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/pages/annotation-new.scss';
</style>
