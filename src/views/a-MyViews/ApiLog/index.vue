<template>
  <div>
    <el-table
      :data="data[page]"
      max-height="800"
      style="width: 1300px"
      border
      stripe
    >
      <el-table-column
        label="ID"
        prop="ID"
        width="100"
      />

      <el-table-column
        label="IP"
        prop="IP"
        width="150"
      />

      <el-table-column
        label="发生时间"
        prop="CreatedAt"
        width="250"
      />

      <el-table-column
        label="事件"
        prop="Content"
        width="400"
      />
    </el-table>
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
  </div>
</template>

<script>
import {
  getApiLog
} from '@/api/apiLog'
import pages from './ChildCpm/pages.vue'
export default {
  components: {
    pages
  },
  props: {

  },
  data() {
    return {
      page_size: 16,
      page: 1,
      totalPages: 20,
      data: {
        '1': []
      }
    }
  },
  created() {
    this.getApiLog(this.page, this.page_size)
  },
  methods: {
    getApiLog(page, page_size) {
      getApiLog(page, page_size).then(res => {
        if (page === this.totalPages / 10 && res.data[res.data.length - 1].ID !== 1) this.totalPages += 10
        this.data[page] = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    pageChange(idx) {
      this.getApiLog(idx, this.page_size)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        this.page = idx
        loading.close()
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
