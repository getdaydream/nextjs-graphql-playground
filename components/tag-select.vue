<template>
  <el-select
    v-model="tags"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择标签"
    @change="tagsChange">
    <el-option
      v-for="tag in tagOptions"
      :key="tag.id"
      :label="tag.name"
      :value="tag.id"/>
  </el-select>
</template>

<script>
export default {

}
</script>
