<template>
  <div class="container">
    <button
      class="btn btn-dark"
      @click="commit">提交</button>
    <el-input
      v-model="position"
      placeholder="position"/>
    <el-input
      v-model="content"
      placeholder="content"
      type="textarea"/>
    <el-input
      placeholder="comment"
      v-model="comment"/>
  </div>
</template>

<script>
import { http } from '../../util/http';

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
      const { data } = await http.post('/annotation', params);
      console.log(data);
      this.$router.push(`/annotation/${data.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/annotation-new.scss';
</style>
