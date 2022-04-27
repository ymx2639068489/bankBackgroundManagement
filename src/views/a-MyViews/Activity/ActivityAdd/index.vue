<template>
  <el-card>
    <div>
      <el-form style="width: 500px">
        <el-form-item :label-width="labelWidth" label="活动名称">
          <el-input v-model="form.activity_name" type="text" />
        </el-form-item>
        <el-form-item label="活动开始时间" :label-width="labelWidth">
          <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="活动结束时间" :label-width="labelWidth">
          <el-date-picker v-model="form.ending_time" type="datetime" placeholder="选择结束时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="活动商品" :label-width="labelWidth">
          <el-autocomplete
            v-model="form.product_id"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="活动描述" :label-width="labelWidth">
          <el-input v-model="form.description" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="规则介绍" :label-width="labelWidth">
          <el-input v-model="form.roles_introduction" type="textarea" autosize />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button style="background: rgb(66,185,131); color: white; margin-left: 200px;" @click="submit">添加活动</el-button>
      <el-button style="background: rgb(66,185,131); color: white;" @click="$router.push('/activity/activityList')">取消</el-button>
    </div>
  </el-card>
</template>

<script>
import { getProductList } from '@/api/product'
import { addActivity } from '@/api/activity'
export default {
  data() {
    return {
      labelWidth: '100px',
      form: {
        activity_name: '',
        description: '',
        ending_time: '',
        product_id: '',
        roles_introduction: '',
        start_time: ''
      }
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getProductList({
          page: 1,
          page_size: 100,
          product_name: queryString,
          audit_status: 2
        }).then(res => {
          const _1 = res.List.map(item => ({ value: item.ID + ' ' + item.product_name, label: item.ID }))
          cb(_1)
        })
      }, 300)
    },
    submit() {
      console.log(this.form)
      if (this.form.activity_name === '') {
        this.$message.error('活动名称不能为空')
        return
      }
      if (this.form.product_id === '') {
        this.$message.error('活动商品不能为空')
        return
      }
      if (this.form.start_time === '') {
        this.$message.error('活动开始时间不能为空')
        return
      }
      if (this.form.ending_time === '') {
        this.$message.error('活动结束时间不能为空')
        return
      }
      addActivity(this.form).then(res => {
        this.$message({ type: 'success', message: res })
        setTimeout(() => { this.$router.push('/activity/activityList') }, 2000)
      })
    }
  }
}
</script>

<style scoped>
.el-card{
  margin: 150px auto;
  width: 600px;
  /* height: 500px; */
}
</style>
