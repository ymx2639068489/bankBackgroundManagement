<template>
  <div>
    <sift ref="sift" />
    <list :list="showList" @handleEdit="handleEdit" />
    <edit-user ref="editUser" :user-info="currentUser" />
    <pages :total-pages="totlePage" @pageChange="pageChange" />
  </div>
</template>

<script>
import sift from './ChildCpm/sift.vue'
import list from './ChildCpm/list'
import pages from './ChildCpm/pages'
import editUser from './ChildCpm/editUser'
import { getUserList } from '@/api/userList'
// import
export default {
  components: {
    list,
    sift,
    pages,
    editUser
  },
  data() {
    return {
      showList: [],
      totlePage: 10,
      indexPage: 1,
      page_size: 2,
      currentUser: { nick_name: '', occupation: '', status: '', user_uuid: '' }
    }
  },
  watch: {
    page_size(n, o) {
      this.indexPage = 1
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserList({
        page: this.indexPage,
        page_size: this.page_size,
        age: this.$refs.sift.form.age,
        gender: this.$refs.sift.form.gender,
        status: this.$refs.sift.form.status
      }).then(res => {
        console.log(res)
        this.showList = res.List
        this.totlePage = Math.ceil(res.total / this.page_size) * 10
        console.log(this.totlePage)
      })
    },
    handleEdit(item) {
      for (const key in this.currentUser) this.currentUser[key] = item[key]
      this.$refs.editUser.dialogVisiable = true
    },
    pageChange(page) {
      this.indexPage = page
      this.getUserList()
    }
  }
}
</script>

<style scoped>

</style>
