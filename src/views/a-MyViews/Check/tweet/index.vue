<template>
  <div>
    <div>
      <div v-show="showList.length === 0">
        暂无数据
      </div>
      <list-item
        v-for="(item, index) in showList"
        :key="index"
        :item="item"
        @itemUpdateClick="itemUpdateClick"
        @itemCollectClick="itemCollectClick"
      />
    </div>
    <el-pagination
      ref="page"
      style="margin-left: 30vw"
      background
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { tweet_status_list, tweet_status_map } from '@/mock_data/sift'
import { getTweetList } from '@/api/tweet'
import { auditArticle } from '@/api/audit'
import listItem from './ChildCpm/listItem'

export default {
  components: {
    listItem
  },
  data() {
    return {
      tweet_status_list,
      tweet_status_map,
      totalPages: 0,
      form: {
        status: 1,
        page: 1,
        page_size: 10
      },
      showList: []
    }
  },
  created() {
    this.getTweetList()
  },
  methods: {
    goToSearch() {
      this.form.page = 1
      this.getTweetList()
    },
    getTweetList() {
      getTweetList(this.form).then(res => {
        this.showList.splice(0, this.showList.length)
        if (!res.data.list) return
        const { list } = res.data
        this.showList.push(...list)
        this.totalPages = Math.ceil(res.data.total / this.form.page_size) * 10
      })
    },
    handleCurrentChange(page) {
      this.form.page = page
      this.getTweetList()
    },
    itemCollectClick(item, message) {
      auditArticle({
        articleID: Number(item),
        message: message,
        result: -1
      }).then(res => {
        console.log(res)
        this.$message({ type: 'success', message: '拒绝成功' })
        this.getTweetList()
      })
    },
    itemUpdateClick(item) {
      auditArticle({
        articleID: Number(item),
        message: '',
        result: 2
      }).then(res => {
        // console.log(res)
        this.$message({ type: 'success', message: '审核成功' })
        this.getTweetList()
      })
    }
  }
}
</script>

<style scoped>

</style>
