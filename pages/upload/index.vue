<template>
  <div class="container">
    <el-upload
      action=""
      list-type="picture-card"
      accept="image/jpg, image/jpeg, image/png, image/gif"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt="">
    </el-dialog>

    <button
      class="btn btn-dark"
      @click="publish">
      发布图片
    </button>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import { http } from '../../util/http';

export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList;
      if (file.status === 'ready') {
        this.upload(file);
      }
      console.log(fileList);
    },
    handleProgress(percentage, uid) {
      const file = this.fileList.find(v => v.uid === uid);
      file.percentage = percentage;
      file.status = 'uploading';
    },
    handleSuccess(res, uid) {
      const file = this.fileList.find(v => v.uid === uid);
      file.status = 'success';
      file.percentage = 100;
      file.response = res;
    },
    handleError(err, uid) {
      const file = this.fileList.find(v => v.uid === uid);
      file.status = 'fail';
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(f => f.uid === file.uid);
      this.fileList.splice(index, 1);
    },
    async upload(file) {
      const { data } = await http.get('/files/uploadToken');
      const { token } = data;
      const { uid } = file;
      const observable = qiniu.upload(file.raw, uid, token, {}, {});
      // 注册回调
      const observer = {
        next: res => {
          const { percent } = res.total;
          this.handleProgress(percent, uid);
        },
        error: err => {
          this.handleError(err, uid);
        },
        complete: res => {
          this.handleSuccess(res, uid);
        },
      };
      // 开始上传
      observable.subscribe(observer);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    publish() {},
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/upload.scss';
</style>


