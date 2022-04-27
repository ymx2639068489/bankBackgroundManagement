<template>
  <div class="box">
    <el-dialog title="请输入密码" :visible.sync="dialogVisible" class="dial">
      <el-form :model="form">
        <p>旧密码</p>
        <el-form-item>
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <p>新密码</p>
        <el-form-item>
          <el-input v-model="form.new_password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="surePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        new_password: '',
        password: ''
      }
    }
  },
  methods: {
    surePassword() {
      this.dialogVisible = false
      this.form.new_password = this.$md5(this.form.new_password)
      this.form.password = this.$md5(this.form.password)
      this.$emit('surePassword', this.form)
      this.form.new_password = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>
.box >>> .el-dialog{
  width: 80%;
  max-width: 500px;
}
</style>
