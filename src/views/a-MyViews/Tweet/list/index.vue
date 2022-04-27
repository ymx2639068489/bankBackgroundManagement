<template>
  <div>
    <div style="margin: 50px 0 0 200px;">
      <el-select v-model="form.status" placeholder="请选择状态">
        <el-option
          v-for="(item, index) in tweet_status_list"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button @click="goToSearch">查询</el-button>
      <el-button @click="$router.push('/tweet/addTweet')">添加推文</el-button>
    </div>
    <div>
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

import listItem from './ChildCpm/listItem'

export default {
  components: {
    listItem
  },
  data() {
    return {
      tweet_status_list,
      tweet_status_map,
      totalPages: 100,
      form: {
        status: '',
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
        const { list } = res.data
        if (!list) return
        this.showList.push(...list)
        this.totalPages = Math.ceil(res.data.total / this.form.page_size) * 10
      })
    },
    handleCurrentChange(page) {
      this.form.page = page
    },
    itemCollectClick(item) {
      this.$router.push('/tweet/showMore/' + item)
    },
    itemUpdateClick(item) {
      this.$router.push('/tweet/update/' + item)
    }
  }
}
</script>

<style scoped>

</style>
