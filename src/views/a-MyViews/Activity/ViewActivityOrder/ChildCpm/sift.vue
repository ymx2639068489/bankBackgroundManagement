<template>
  <div style="margin-top: 20px;margin-left: 50px;width: 800px">
    <el-form :inline="true" :model="$parent.form" class="demo-form-inline">
      <el-form-item label="产品状态" label-width="100px">
        <el-select v-model="$parent.form.order_status" clearable placeholder="产品状态">
          <el-option
            v-for="item of order_status_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 100px" @click="onSubmit">点击查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  order_status_list
} from '@/mock_data/sift'
export default {
  data() {
    return {
      order_status_list
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
