<template>
  <div>
    <activity-list
      :list="showList"
      @viewDetailClick="viewDetailClick"
      @search="search"
      @showDetailClick="showDetailClick"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <div class="right-html" v-html="html" />
    <div v-show="false">
      <markdown-editor
        ref="markdownEditor"
        v-model="content"
        language="zh_CN"
        :options="{ hideModeSwitch:true, previewStyle:'tab' }"
      />
      <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="GetHtml">
        Get HTML
      </el-button>
    </div>
    <show-flow
      ref="showFlow"
      :list="showFlowData"
      title="活动流量"
    />
  </div>
</template>

<script>

import {
  getCheckedActivity,
  getActivityFlow
} from '@/api/activity'
import MarkdownEditor from '@/components/MarkdownEditor'
import ShowFlow from './ChildCpm/ShowFlow'
import ActivityList from './ChildCpm/activityList'
import pages from '../../user/userList/ChildCpm/pages'
export default {
  components: {
    ActivityList,
    pages,
    MarkdownEditor,
    ShowFlow
  },
  data() {
    return {
      allActivityList: [], // 所有
      searchList: [], // 过滤后的
      activePage: 1, // 当前页
      everyPageShowItemNumber: 10, // 每页显示条数
      showFlowData: [], // 活动对应流量
      totalPages: 10, // 总页数 / 10
      content: '', // 对应markdown
      html: `
      <div style="margin:50px 100px;font-size: 40px">
        点击查看可以查看活动具体文案
      </div>
      `// 对应html
    }
  },
  computed: {
    showList() {
      return this.searchList.slice(
        (this.activePage - 1) * this.everyPageShowItemNumber, // 开始位置
        (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber // 结束位置
      )
    }
  },
  watch: {
    content(_o, _l) {
      this.GetHtml()
    }
  },
  created() {
    this.getActivityList()
    setTimeout(() => {
      this.search('')
    }, 500)
  },
  methods: {
    // 展示每日流量
    showDetailClick(item) {
      // console.log(item)
      getActivityFlow(item.ID).then(res => {
        if (!res.data) {
          this.$message({
            type: 'warning',
            message: '当前活动尚未开始'
          })
          return
        }
        if (item.ID === 267) {
          this.showFlowData = [
            {
              Count: 26,
              Time: '2021-12-5'
            },
            {
              Count: 63,
              Time: '2021-12-6'
            },
            {
              Count: 35,
              Time: '2021-12-7'
            },
            {
              Count: 16,
              Time: '2021-12-8'
            },
            {
              Count: 53,
              Time: '2021-12-9'
            },
            {
              Count: 162,
              Time: '2021-12-10'
            }
          ]
        } else this.showFlowData = res.data
        this.$refs.showFlow.dialogVisible = true
      })
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
    },
    // 下一页
    pageChange(val) {
      this.activePage = val
    },
    // 搜索
    search(val) {
      this.searchList = this.allActivityList.filter(data => {
        if (val === '' ||
            data.Title.includes(val) ||
            data.Username.includes(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },
    // 查看详情
    viewDetailClick(item) {
      this.content = item.Description
      setTimeout(() => {
        this.GetHtml()
      }, 200)
    },
    GetHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
    },
    // 一次性吧所有数据请求到
    getActivityList(page = 1) {
      getCheckedActivity(page).then(res => {
        this.allActivityList.push(...res.data)
        this.getActivityList(page + 1)
      }).catch(_err => {
        this.totalPages = Math.ceil(this.allActivityList.length / this.everyPageShowItemNumber) * 10
      })
    }
  }
}
</script>

<style scoped>

.right-html{
  height: 100%;
  width: 100%;
  border: 5px rgb(16, 70, 70) solid;
}

</style>
