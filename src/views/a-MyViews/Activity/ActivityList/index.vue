<template>
  <div>
    <sift ref="sift" />
    <list-cpm
      :list="list"
      @lookGoods="lookGoods"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
  </div>
</template>

<script>

import { getActivityList } from '@/api/activity'
import { activity_status_list } from '@/mock_data/sift'
import { parseTime } from '@/utils/index'
import listCpm from './ChildCpm/list.vue'
import sift from './ChildCpm/sift.vue'
import pages from './ChildCpm/pages.vue'
export default {
  components: {
    sift,
    pages,
    listCpm
  },
  data() {
    return {
      indexPage: 1,
      totalPages: 20,
      page_size: 8,
      list: [],
      activity_status_list
    }
  },
  mounted() {
    this.getActivityList()
  },
  methods: {
    pageChange(val) {
      this.indexPage = val
      this.getActivityList()
    },
    getActivityList() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      getActivityList({
        page: this.indexPage,
        page_size: this.page_size,
        activity_status: Number(this.$refs.sift.form.activity_status),
        audit_status: Number(this.$refs.sift.form.audit_status),
        start_time: this.$refs.sift.form.start_time && this.$refs.sift.form.start_time[0] ? parseTime(this.$refs.sift.form.start_time[0]) : '',
        ending_time: this.$refs.sift.form.start_time && this.$refs.sift.form.start_time[1] ? parseTime(this.$refs.sift.form.start_time[1]) : ''
      }).then(res => {
        this.list = res.list
        this.totalPages = Math.ceil(res.total / this.page_size) * 10
        loading.close()
      })
    },
    lookGoods(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
</style>
