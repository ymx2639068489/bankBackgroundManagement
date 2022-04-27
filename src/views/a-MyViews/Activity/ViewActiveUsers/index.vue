<template>
  <div>
    <div id="main" style="width: 100%; height:90vh;" />
    <el-table
      :data="orgrinArray"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="apply_time"
        label="申请时间"
        width="180"
      />
      <el-table-column
        prop="user_id"
        label="用户ID"
        width="180"
      />
      <el-table-column
        prop="cause"
        label="原因"
      />
    </el-table>
  </div>
</template>

<script>
import { getActivityUserRecord } from '@/api/activity'
export default {
  data() {
    return {
      orgrinArray: []
    }
  },
  mounted() {
    const _1 = this.$store.getters.getCurrentActive
    if (!(_1 && _1.activity_id)) {
      this.$message({ type: 'warning', message: '请先选择活动' })
      this.$router.push('/activity/activityList')
      return
    }
    getActivityUserRecord(_1.activity_id).then(res => {
      this.orgrinArray = res
      const mp1 = {}
      const mp2 = {}
      for (const item of res) {
        const _2 = this.$IsoToString(item.apply_time).substr(0, 9)
        if (item.status) {
          if (mp1[_2]) mp1[_2]++
          else mp1[_2] = 1
        } else {
          if (mp2[_2]) mp2[_2]++
          else mp2[_2] = 1
        }
      }
      const xAxisData = []
      const seriesData1 = []
      const seriesData2 = []
      for (const key in mp1) {
        xAxisData.push(key)
        seriesData1.push(mp1[key])
      }
      for (const key in mp2) {
        seriesData2.push(mp2[key])
      }
      var myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {
          text: _1.activity_name + '用户记录'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          data: xAxisData,
          axisLine: {
            symbol: 'arrow',
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            length: 6,
            lineStyle: {
              type: 'dashed'
              // ...
            }
          }
        },
        yAxis: {
          axisLine: {
            symbol: 'arrow',
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            length: 6,
            lineStyle: {
              type: 'dashed'
              // ...
            }
          }
        },
        series: [
          {
            type: 'line',
            data: seriesData1,
            areaStyle: {}
          },
          {
            type: 'line',
            data: seriesData2,
            areaStyle: {}
          }
        ]
      })
    })
  },
  destroyed() {
    this.$store.commit('cacheData/SET_CURRENT_ACTIVE', {})
  },
  methods: {
    tableRowClassName({ row, _rowIndex }) {
      if (row.status) return 'success-row'
      return 'warning-row'
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
