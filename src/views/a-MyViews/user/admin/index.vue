<template>
  <div>
    <product-list-cpm
      :list="showList"
      :user-roles="allUserRolesList"
      @updateUserRoles="updateUserRoles"
      @addAdmin="$refs.addAdmin.dialogVisible = true"
      @showMore="showMore"
    />
    <page
      :total-pages="totalPages * 10"
      :index-page="indexPage"
      @pageChange="pageChange"
    />
    <add-admin
      ref="addAdmin"
      @addAdmin="addAdmin"
    />
    <roles-list
      ref="rolesList"
      :user-info="currentUserInfo"
      :user-roles="allRolesList"
      @doAssignRole="doAssignRole"
    />
    <show-more-user-info
      ref="showMoreUserInfo"
      :user-info="currentUserInfo"
      @updateCurrenAdminInfo="updateCurrenAdminInfo"
    />
  </div>
</template>

<script>
// 子组件
import page from './ChildCpm/pages'
import addAdmin from './ChildCpm/addAdmin'
import rolesList from './ChildCpm/rolesList'
import productListCpm from './ChildCpm/adminList'
import showMoreUserInfo from './ChildCpm/showMoreUserInfo'
import {
  createAdmin,
  getAdminList,
  doAssignRole,
  getAdminRolesList,
  updateCurrenAdminInfo
} from '@/api/admin'
// import
export default {
  components: {
    page,
    addAdmin,
    rolesList,
    productListCpm,
    showMoreUserInfo
  },
  data() {
    return {
      indexPage: 1,
      totalPages: 20,
      page_size: 10,
      showList: [],
      currentUserInfo: { roles: [] },
      allUserRolesList: {},
      allRolesList: []
    }
  },
  created() {
    getAdminRolesList().then(res => {
      for (const item of res.List) {
        this.allUserRolesList[item.authority_name] = item.description
        this.allRolesList.push({ value: item.authority_name, label: item.description, ID: item.ID })
      }
    })
    this.indexPage = this.$store.getters.getAdminPage
    this.getAdminList(this.indexPage)
  },
  beforeDestroy() {
    this.$store.commit('cacheData/SET_ADMIN_PAGE', this.indexPage)
  },
  methods: {
    pageChange(page) { // 页码改变
      this.page = page
      this.getAdminList()
    },
    // 点击更新权限
    updateUserRoles(userInfo) {
      this.currentUserInfo = userInfo
      this.$refs.rolesList.dialogVisible = true
    },
    // 点击查看更多
    showMore(userInfo) {
      this.currentUserInfo = userInfo
      this.$refs.showMoreUserInfo.dialogVisible = true
    },
    addAdmin(userInfo) {
      createAdmin(userInfo).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getAdminList()
      })
    },
    updateCurrenAdminInfo(form) {
      updateCurrenAdminInfo(form).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        setTimeout(() => {
          this.getAdminList()
        }, 500)
      })
    },
    getAdminList() {
      getAdminList(this.indexPage, this.page_size).then(res => {
        this.totalPages = Math.ceil(res.total / this.page_size)
        const { data } = res
        this.showList.splice(0, this.showList.length, ...data)
      })
    },
    doAssignRole(authority_id, uuid) {
      doAssignRole(authority_id, uuid).then(res => {
        this.$message({
          message: '分配成功',
          type: 'success'
        })
        setTimeout(() => {
          this.getAdminList()
        }, 500)
      })
    }
  }
}
</script>

<style scoped>

</style>
