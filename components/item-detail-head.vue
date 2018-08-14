<template>
  <div
    class="object-detail-head"
    @click="enterDetail">
    <!-- 资源图片 -->
    <img
      :src="item.cover"
      class="poster">
    <!-- 资源信息 -->
    <div class="info-box">
      <div class="resource-title">
        {{ item.title + (item.year ? ` (${item.year})` : '' ) }}
      </div>
      <!-- 资源标记 -->
      <div class="resource-mark-info">
        <app-button @click.native="resourceMarkDialogVisible = true">想看</app-button>
        <app-button @click.native="resourceMarkDialogVisible = true">在看</app-button>
        <app-button @click.native="resourceMarkDialogVisible = true">看过</app-button>
      </div>
    </div>
    <!-- 评分信息 -->
    <div class="score-box">
      <div class="score-title">豆瓣评分</div>
      <div
        v-if="item.ratingValue"
        class="rating-value">
        {{ Number(item.ratingValue).toFixed(1) }}
        <span class="rating-value-slash">/</span>
        <span class="rating-value-total">10</span>
      </div>
      <div v-else>
        尚无评分
      </div>
      <div v-if="item.ratingCount">
        {{ item.ratingCount }} 人评价
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from './app-button';

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      resourceMarkDialogVisible: false,
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      default() {
        return {
          id: '',
          title: '',
          year: '',
          cover: '',
          ratingValue: '',
          ratingCount: '',
        };
      },
    },
  },
  methods: {
    enterDetail() {
      this.$router.push(`/${this.category}/${this.item.id}`)
    },
  },
};
</script>

<style scoped>
.object-detail-head {
  position: relative;
  width: 700px;
  padding: 20px;
  min-height: 150px;
  display: flex;
  cursor: pointer;
}

.poster-wrapper {
  position: absolute;
  bottom: 0;
  left: 20px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 1px;
}

.poster {
  position: absolute;
  left: 20px;
  bottom: 15px;
  width: 120px;
  height: auto;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
}

.info-box {
  flex: 1;
  margin-left: 137px;
}
.resource-title {
  padding-right: 20px;
  font-weight: bolder;
  color: white;
}

.score-box {
  border-left: 1px solid hsla(0, 0%, 100%, 0.1);
  width: 144px;
  text-align: left;
  padding-left: 30px;
}

.score-title {
  color: rgba(255, 255, 255, 0.3);
}

.rating-value {
  color: #fff280;
  font-size: 42px;
}

.rating-value-slash {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

.rating-value-total {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

.resource-mark-info {
  position: absolute;
  bottom: 15px;
}
</style>
