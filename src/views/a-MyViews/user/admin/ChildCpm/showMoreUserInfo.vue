<template>
  <el-dialog
    v-if="dialogVisible"
    title="管理员信息"
    :visible.sync="dialogVisible"
    style="width: 1300px;"
  >
    <table class="table-box" style="margin-left: 50px" border="0">
      <tr :height="lineHeight">
        <td :width="lableWidth">昵称: </td>
        <td :width="dataWidth">
          <el-input
            v-model="updateUserInfo.nick_name"
            placeholder="请输入昵称"
            class="inputs"
          />
        </td>
      </tr>
      <tr :height="lineHeight">
        <td :width="lableWidth">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</td>
        <td :width="dataWidth">
          <el-input
            v-model="updateUserInfo.email"
            placeholder="请输入邮箱"
            class="inputs"
          />
        </td>
        <td :width="lableWidth">用户名: </td>
        <td :width="dataWidth">{{ userInfo.username }}</td>
      </tr>
      <tr :height="lineHeight">
        <td :width="lableWidth">手机号: </td>
        <td :width="dataWidth">
          <el-input
            v-model="updateUserInfo.phone"
            placeholder="请输入手机号"
            class="inputs"
          />
        </td>
        <td :width="lableWidth">状态：</td>
        <td :width="dataWidth">
          <el-switch
            v-model="updateUserInfo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </td>
      </tr>
      <tr :height="lineHeight">
        <td :width="lableWidth">创建人: </td>
        <td :width="dataWidth">{{ userInfo.create_by_username }}</td>
        <td :width="lableWidth">创建时间：</td>
        <td :width="dataWidth">{{ $IsoToString(userInfo.created_at) }}</td>
      </tr>
      <tr :height="lineHeight">
        <td :width="lableWidth">登录IP: </td>
        <td :width="dataWidth">{{ userInfo.login_ip }}</td>
        <td :width="lableWidth">登录时间：</td>
        <td :width="dataWidth">{{ $IsoToString(userInfo.login_time) }}</td>
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="userUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          ID: '',
          username: '',
          phone: '',
          email: '',
          status: 0,
          create_by_username: '',
          created_at: '',
          login_ip: '',
          login_time: '',
          nick_name: '',
          roles: [],
          uuid: ''
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      lableWidth: '100px',
      dataWidth: '150px',
      lineHeight: '40px',
      updateUserInfo: {
        UUID: this.userInfo.uuid,
        email: this.userInfo.email,
        nick_name: this.userInfo.nick_name,
        phone: this.userInfo.phone,
        status: this.userInfo.status === 0
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.updateUserInfo = {
          UUID: this.userInfo.uuid,
          email: this.userInfo.email,
          nick_name: this.userInfo.nick_name,
          phone: this.userInfo.phone,
          status: this.userInfo.status === 0
        }
      }
    }
  },
  methods: {
    userUpdate() {
      this.$confirm('此操作将更改管理员信息，确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('updateCurrenAdminInfo', this.updateUserInfo)
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
.table-box >>> .el-input__inner{
  color: #868686;
  border-bottom: 1px solid #DCDFE6;
  border-left: 0 solid rgb(225,243,253);
  border-top: 0 solid rgb(225,243,253);
  border-right: 0 solid rgb(225,243,253);
  padding: 0 solid rgb(225,243,253);
}
.table-box >>> .el-input__inner {
  padding: 0 0;
}
</style>
