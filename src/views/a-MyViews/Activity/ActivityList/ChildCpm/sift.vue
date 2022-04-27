<template>
  <div style="margin: 50px 0 30px 0">
    <el-form style="100%" :inline="true">
      <el-form-item label="活动状态" label-width="150px">
        <el-select v-model="form.activity_status" clearable>
          <el-option
            v-for="item in activity_status_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态" label-width="150px">
        <el-select v-model="form.audit_status" clearable>
          <el-option
            v-for="item in activity_audit_status_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" label-width="150px">
        <el-date-picker
          v-model="form.start_time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="左区间边界"
          end-placeholder="右区间边界"
          align="right"
        />
      </el-form-item>
      <el-button
        style="background: rgb(66,185,131); color: white; margin-left: 50px"
        @click="submit"
      >查询活动</el-button>
    </el-form>
  </div>
</template>

<script>
import { activity_status_list, activity_audit_status_list } from '@/mock_data/sift'
import { pickerOptions } from '@/mock_data/ElementUi'
export default {
  data() {
    return {
      form: {
        audit_status: '',
        activity_status: '',
        start_time: ''
      },
      pickerOptions,
      activity_status_list,
      activity_audit_status_list
    }
  },
  methods: {
    submit() {
      this.$parent.getActivityList()
    }
  }
}
</script>

<style scoped>

</style>
