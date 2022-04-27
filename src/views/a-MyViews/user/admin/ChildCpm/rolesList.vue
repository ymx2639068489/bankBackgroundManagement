<template>
  <el-dialog v-if="dialogVisible" title="权限列表" :visible.sync="dialogVisible">
    <el-tree
      ref="tree"
      :data="userRoles"
      show-checkbox
      node-key="value"
      :default-checked-keys="userInfo.roles"
      highlight-current
      :props="defaultProps"
      :render-content="renderContent"
      :check-on-click-node="true"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureDoAssignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    userRoles: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        label: 'title'
      }
    }
  },
  watch: {
    dialogVisible(o, l) {
      // 每次关闭窗口的时候我们就清空已经被选的选项
      if (l) this.$refs.tree.setCheckedKeys([])
    }
  },
  methods: {
    renderContent(h, { node, data }) {
      return (
        <span>
          {data.value} + {data.label}
        </span>
      )
    },
    sureDoAssignRole() {
      // 提交
      // console.log(this.userInfo)
      // 提取所有选中的选项，然后遍历得到提交的权限发送到服务器更新用户权限
      const _1 = this.$refs.tree.getCheckedNodes()
      const _2 = []
      for (const i of _1) _2.push(i.ID)
      if (_2.length !== 0) {
        this.dialogVisible = false
        // console.log(_2)
        this.$emit('doAssignRole', _2, this.userInfo.uuid)
      } else this.$message.error('请选择权限')
    }
  }
}
</script>

<style scoped>

</style>
