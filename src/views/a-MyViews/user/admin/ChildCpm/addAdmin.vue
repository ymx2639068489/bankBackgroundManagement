<template>
  <el-dialog title="新建管理员" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="账号:" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否随机密码:" :label-width="formLabelWidth">
        <el-switch v-model="form.is_random_password" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item v-show="!form.is_random_password" label="密码:" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱:" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号:" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态:" :label-width="formLabelWidth">
        <el-radio v-model="form.status" :label="0">激活</el-radio>
        <el-radio v-model="form.status" :label="1">封禁</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        username: '',
        password: '',
        phone: '',
        email: '',
        status: 0,
        is_random_password: false
      },
      formLabelWidth: '125px'
    }
  },
  methods: {
    submit() {
      const { username, phone, email } = this.form
      if (!username) {
        this.$message({
          message: '请输入账号',
          type: 'warning'
        })
        return
      }
      if (!email) {
        this.$message({
          message: '请输入邮箱',
          type: 'warning'
        })
        return
      }
      if (!phone || phone.length !== 11) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return
      }
      this.form.password = this.$md5(this.form.password)
      this.$emit('addAdmin', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
