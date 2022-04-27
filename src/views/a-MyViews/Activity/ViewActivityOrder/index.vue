<template>
  <div>
    <sift @submit="submit" />
    <list-cpm
      :list="showList"
    />
    <page
      :total-pages="totalPages * 10"
      :index-page="indexPage"
      @pageChange="pageChange"
    />
  </div>
</template>

<script>
// 子组件
import listCpm from './ChildCpm/list'
import page from './ChildCpm/pages'
import sift from './ChildCpm/sift'
import { getOrderList } from '@/api/activity'

// import
export default {
  components: {
    sift,
    page,
    listCpm
  },
  data() {
    return {
      indexPage: 1,
      totalPages: 20,
      showList: [],
      form: {
        page: 0,
        page_size: 20, // 禁止修改
        order_status: '',
        activity_id: ''
      }
    }
  },
  created() {
    this.form.activity_id = this.$store.getters.getCurrentActive.activity_id
    if (!this.form.activity_id) {
      this.$message({
        type: 'error',
        message: '请先选择活动'
      })
      this.$router.replace('/activity/activityList')
      return
    }
    this.getOrderList()
  },
  methods: {
    submit() {
      this.getOrderList()
    },
    pageChange(page) { // 页码改变
      this.form.page = page
      this.getOrderList(this.form)
    },
    getOrderList() {
      getOrderList(this.form).then(res => {
        console.log(res)
        this.totalPages = Math.ceil(res.Total / this.form.page_size)
        const { list } = res
        this.showList.splice(0, this.showList.length, ...list)
      })
    }
  }
}
</script>

<style scoped>

</style>
