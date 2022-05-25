<template>
  <el-container>
    <el-header>
      <b>{{ $store.getters.getCurrentActive.activity_name }}</b> 筛选配置
    </el-header>
    <el-container>
      <el-aside width="400px">
        <left :filter-list="filterList" />
      </el-aside>
      <el-main>
        <h3 class="yiy">选择新规则</h3>
        <right :current-filter-list="filterList" @addItem="addItem" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  getFilterListByActivityID
} from '@/api/sift'
import left from './ChildCpm/left'
import right from './ChildCpm/right'
export default {
  components: {
    left,
    right
  },
  data() {
    return {
      activity_id: '',
      count: 13,
      filterList: []
    }
  },
  created() {
    this.activity_id = this.$store.getters.getCurrentActive.activity_id
    if (!this.activity_id) {
      this.$message.error('请先选择活动')
      setTimeout(() => { this.$router.push('/activity') }, 1000)
    }
    this.getFilterListByActivityID()
  },
  methods: {
    getFilterListByActivityID() {
      getFilterListByActivityID(this.activity_id).then(res => {
        // 去重
        this.filterList.splice(0, this.filterList.length)
        for (const i of res) {
          let f = true
          if (this.filterList.length) {
            for (const j of this.filterList) {
              if (i.field_name === j.field_name &&
                  i.value_range === j.value_range
              ) {
                f = false
                break
              }
            }
          }
          if (f) this.filterList.push(i)
        }
      })
    },
    addItem() {
      console.log('addItem')
      this.getFilterListByActivityID()
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-container >>> .el-aside {
    position: relative;
    background: white;
    height: calc(100vh - 144px);
    margin-bottom: 0;
    color: #333;
    text-align: center;
  }

  .el-main {
    height: calc(100vh - 144px);
    margin-bottom: 0;
    color: #333;
    text-align: center;
    border-left: 20px solid #B3C0D1;
  }
</style>
