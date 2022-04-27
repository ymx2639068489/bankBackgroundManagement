<template>
  <el-dialog
    v-if="dialogVisiable"
    title="修改用户信息"
    :visible.sync="dialogVisiable"
  >
    <el-form style="width: 450px">
      <el-form-item label="用户昵称" label-width="150px">
        <el-input
          v-model="form.nick_name"
          placeholder="请输入用户昵称"
        />
      </el-form-item>
      <el-form-item label="用户职业" label-width="150px">
        <el-input
          v-model="form.occupation"
          placeholder="请输入用户昵称"
        />
      </el-form-item>
      <el-form-item label="用户状态" label-width="150px">
        <el-switch v-model="form.status" active-color="#13ce66" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisiable = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateUser } from '@/api/userList'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          nick_name: '',
          occupation: '',
          status: '',
          user_uuid: ''
        }
      }
    }
  },
  data() {
    return {
      dialogVisiable: false,
      form: { nick_name: '', occupation: '', status: true, user_uuid: '' }
    }
  },
  watch: {
    dialogVisiable(n, o) {
      if (n) {
        this.form.nick_name = this.userInfo.nick_name
        this.form.occupation = this.userInfo.occupation
        this.form.user_uuid = this.userInfo.user_uuid
        this.form.status = this.userInfo.status === 1
      }
    }
  },
  methods: {
    submit() {
      this.$confirm(`确定更新 ${this.userInfo.nick_name} 信息`).then(() => {
        updateUser({
          nick_name: this.form.nick_name,
          occupation: this.form.occupation,
          status: this.form.status ? 1 : -1,
          user_uuid: this.form.user_uuid
        }).then(res => {
          this.$message({ type: 'success', message: '更新成功' })
          this.dialogVisiable = false
          this.$parent.getUserList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
