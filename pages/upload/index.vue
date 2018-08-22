<template>
  <div class="container">
    <button
      class="btn btn-dark"
      @click="publish">
      发布图片
    </button>
    <div class="upload">
      <div class="upload-left">
        <el-upload
          action=""
          accept="image/jpg, image/jpeg, image/png, image/gif"
          list-type="picture"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-preview="handlePreview">
          <app-button>点击上传</app-button>
        </el-upload>
      </div>
      <div class="upload-right">
        <template v-if="inspectedFile">
          <img
            :src="inspectedFile.url"
            class="preview-image"
            style="display:block;">
          标题
          <el-input v-model="fileDataMap[inspectedFile.uid].title"/>
          描述
          <el-input v-model="fileDataMap[inspectedFile.uid].description"/>

        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import { http } from '../../util/http';
import AppButton from '../../components/app-button.vue';

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      fileList: [],
      inspectedFile: null,

      fileDataMap: {},
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
      this.inspectedFile = null;
    },
    handlePreview(file) {
      console.log(file);
      this.inspectedFile = file;
      const { uid } = file;
      if (!this.fileDataMap[uid]) {
        this.fileDataMap[uid] = {
          title: file.name.split('.')[0],
          description: '',
        };
      }
    },
    // 上传图片至七牛云
    async upload(file) {
      const { data } = await http.get('/files/uploadToken');
      const { token } = data;
      const { uid } = file;
      const ext = file.name.split('.').pop();
      const uuidv1 = require('uuid/v1');
      const observable = qiniu.upload(
        file.raw,
        uuidv1() + '.' + ext,
        token,
        {},
        {},
      );
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
    // 发布图片
    publish() {
      if (this.fileList.length === 0) {
        return;
      }

      const files = this.fileList.map(f => {
        const fileData = this.fileDataMap[f.uid] || {
          title: f.name.split('.')[0],
          description: '',
        };
        const result = {
          key: f.response.key,
          mimeType: f.raw.type,
          hash: f.response.hash,
          size: f.response.size,
          height: f.response.height,
          width: f.response.width,
          title: fileData.title,
          description: fileData.description,
        };
        if (this.$route.params.id) {
          const reg = /\/([a-z]+)\/.+\/upload/;
          //  path e.g. "/movie/26754896/upload"
          const category = this.$route.path.match(reg)[1];
          Object.assign(result, {
            resourceId: this.$route.params.id,
            category,
          });
        }
        return result;
      });
      const params = { files };
      http.post('/files', params);
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/upload.scss';
</style>


