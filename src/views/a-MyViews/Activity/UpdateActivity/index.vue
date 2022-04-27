<template>
  <el-card>
    <div slot="header">
      <h3 style="margin: 0;">
        <el-button icon="el-icon-arrow-left" style="border: 0;" @click="$router.push('/activity/activityList')">返回</el-button>
        更新秒杀活动 {{ form.activity_name }}
      </h3>
    </div>
    <el-form>
      <el-form-item label="活动名称" :label-width="labelWidth">
        <el-input v-model="form.activity_name" />
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
        <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
      </el-form-item>
      <el-form-item label="规则介绍" :label-width="labelWidth">
        <el-input v-model="form.roles_introduction" type="textarea" autosize />
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 250px" type="primary" @click="submit">提交</el-button>
  </el-card>
</template>

<script>
import { getProductList } from '@/api/product'
import { updateActivity, getActivityInfomation } from '@/api/activity'
export default {
  data() {
    return {
      timeout: null,
      labelWidth: '150px',
      form: {
        activity_id: '',
        activity_name: '',
        description: '',
        ending_time: '',
        product_id: '',
        product_name: '',
        roles_introduction: '',
        start_time: ''
      }
    }
  },
  mounted() {
    const _1 = this.$store.state.cacheData.currentActive
    console.log(_1)
    if (!(_1 && _1.activity_id)) this.$router.push('/activity/activityList')
    this.form.activity_id = _1.activity_id
    getActivityInfomation(_1.activity_id).then(res => {
      console.log(res)
      this.form.activity_name = res.activity_name
      this.form.description = res.description
      this.form.product_id = res.product.ID + '' + res.product.product_name
      this.form.roles_introduction = res.roles_introduction
      this.form.start_time = new Date(res.start_time)
      this.form.ending_time = new Date(res.ending_time)
    })
  },
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getProductList({
          page: 1,
          page_size: 100,
          product_name: String(queryString),
          audit_status: 2
        }).then(res => {
          const _1 = res.List.map(item => ({ value: item.ID + ' ' + item.product_name, label: item.ID }))
          cb(_1)
        })
      }, 300)
    },
    submit() {
      updateActivity(this.form).then(res => {
        this.$store.commit('cacheData/SET_CURRENT_ACTIVE', {})
        console.log(res)
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.$router.push('/activity/activityList')
      })
    }
  }
}
</script>

<style scoped>
.el-card{
  width: 600px;
  height: 500px;
  margin: 200px auto;
  margin-bottom: 0;
}
.el-form{
  width: 500px;
}
</style>
