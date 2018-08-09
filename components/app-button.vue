<template>
  <button
    :class="[
      type ? 'app-button-' + type : ''
    ]"
    class="app-button">

    <i
      v-if="icon"
      :class="icon"/>
    <span v-if="$slots.default"><slot/></span>
  </button>
</template>

<script>
export default {
  props: {
    // 'default' | 'switch'
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.app-button {
  display: inline-block;
  padding: 0;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  min-width: 60px;
  padding: 0 8px;
  margin-right: 10px;
}

.app-button-default {
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.app-button-default:hover {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid transparent !important;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
}

.app-button-default:focus {
  outline: none;
}
</style>
