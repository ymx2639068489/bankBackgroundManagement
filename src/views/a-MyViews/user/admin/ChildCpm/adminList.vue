<template>
  <el-table
    :data="list"
  >
    <el-table-column
      prop="ID"
      label="ID"
      width="50"
    />

    <el-table-column
      label="昵称"
      prop="nick_name"
      width="80"
      fixed
    />

    <el-table-column
      label="账号"
      prop="username"
      width="100"
    />

    <el-table-column
      label="手机号"
      prop="phone"
      width="110"
    />

    <el-table-column
      label="权限"
      width="400"
    >
      <template slot-scope="scope">
        <div
          v-for="item in scope.row.roles"
          :key="item"
          class="tag-item"
        >
          <el-popover trigger="hover" placement="top">
            <p>{{ userRoles && userRoles[item] ? userRoles[item] : item }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ item }}</el-tag>
            </div>
          </el-popover>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      min-width="250"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-button type="primary" style="width: 100px;margin-right: 10px" @click="addAdmin">
            添加管理员
          </el-button>
          <el-input
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
            style="width: 200px;"
          >
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
              @click="goSearch"
            />
          </el-input>
        </div>
        <div v-if="false">{{ scope }}</div>
      </template>
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
        >分配权限</el-button>
        <el-button
          size="small"
          @click="handleShow(scope.$index, scope.row)"
        >查看/修改更多</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    userRoles: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    goSearch() {
      console.log('搜索', this.search)
    },
    handleShow(_index, row) {
      this.$emit('showMore', row)
    },
    handleEdit(_index, row) {
      this.$emit('updateUserRoles', row)
    },
    addAdmin() {
      this.$emit('addAdmin')
    }
  }
}
</script>

<style scoped>
.tag-item{
  display: inline-block;
  margin: 10px 5px;
}
</style>
