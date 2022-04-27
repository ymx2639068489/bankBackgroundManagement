<template>
  <div style="margin: 50px 0 30px 0">
    <el-form style="100%" :inline="true">
      <el-form-item label="每页个数" label-width="100px">
        <el-input
          v-model="$parent.page_size"
          placeholder="请输入每页个数"
          style="width: 100px"
          type="number"
          min="1"
        />
      </el-form-item>
      <el-form-item label="状态" label-width="100px">
        <el-select v-model="form.status" clearable>
          <el-option
            v-for="item in user_status_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" label-width="100px">
        <el-select v-model="form.gender" clearable>
          <el-option
            v-for="item in user_gender_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄(置0取消)" label-width="150px">
        <el-input v-model="form.age" type="number" />
      </el-form-item>
      <el-button
        style="background: rgb(66,185,131); color: white; margin-left: 50px"
        @click="submit"
      >查询活动</el-button>
    </el-form>
  </div>
</template>

<script>
import { user_status_list, user_gender_list } from '@/mock_data/sift'
export default {
  data() {
    return {
      form: {
        status: '',
        gender: '',
        age: 0
      },
      user_status_list,
      user_gender_list
    }
  },
  methods: {
    submit() {
      this.$parent.getUserList()
    }
  }
}
</script>

<style scoped>

</style>
