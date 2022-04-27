<template>
  <el-pagination
    ref="page"
    background
    :hide-on-single-page="true"
    layout="prev, pager, next"
    :total="totalPages"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 当页码发生了改变
    handleCurrentChange(page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style scoped>
.el-pagination{
  margin: 20px 29vw;
}
</style>
