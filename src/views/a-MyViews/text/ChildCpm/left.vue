<template>
  <div>
    <el-button
      class="left_top_btn"
      :disabled="filterList.length <= 0"
      @click="finishFilterConfig"
    >完成配置</el-button>
    <h3 class="yiy">活动已有规则</h3>
    <ul class="infinite-list" style="overflow:auto">
      <li v-for="(i, idx) in filterList" :key="idx" class="infinite-list-item">
        <el-card shadow="always" style="margin-top: 15px">
          {{ idx+1 }}. {{ i.description }}
          <el-button icon="el-icon-delete" style="margin-left: 50px " circle @click="delItem(idx)" />
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { finishFilterConfig, deleteFilterByID } from '@/api/sift'
export default {
  props: {
    filterList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    delItem(idx) {
      this.$confirm('确定删除该规则吗？').then(() => {
        deleteFilterByID(this.filterList[idx].ID).then(res => {
          this.$message({ type: 'success', message: res })
          this.filterList.splice(idx, 1)
        })
      }).catch(() => {})
    },
    finishFilterConfig() {
      const _this = this
      finishFilterConfig(this.$store.getters.getCurrentActive.activity_id).then(res => {
        _this.$message({ type: 'success', message: '配置完成' })
        _this.$store.commit('cacheData/SET_CURRENT_ACTIVE', {})
        setTimeout(() => { _this.$router.push('/activity/activityList') }, 2000)
      })
    }
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
  .left_top_btn{
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 50px;
    background: rgb(66,185,131);
    color: #fff;
    z-index: 999;
  }
  .infinite-list{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .infinite-list >>> .el-card__body{
    padding: 10px;
  }
  .yiy{
    position: sticky;
    top: -10px;
    background: white;
  }
</style>
