<template>
  <div style="margin-top: 20px;margin-left: 50px;width: 800px">
    <el-form :inline="true" :model="$parent.form" class="demo-form-inline">
      <el-form-item label="产品名" label-width="100px">
        <el-input v-model="$parent.form.product_name" clearable placeholder="产品名" />
      </el-form-item>
      <el-form-item label="利率类型" label-width="100px">
        <el-select v-model="$parent.form.interest_rate_type" clearable placeholder="利率类型">
          <el-option
            v-for="item of interest_rate_type_options"
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
  product_status_options,
  interest_rate_type_options
} from '@/mock_data/sift'
export default {
  data() {
    return {
      product_status_options,
      interest_rate_type_options
    }
  },
  methods: {
    onSubmit() {
      console.log('111')
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
