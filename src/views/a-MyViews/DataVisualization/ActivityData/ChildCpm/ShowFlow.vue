<template>
  <div v-if="dialogVisible" class="box">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="90%"
    >
      <div class="chart-container">
        <chart
          :title="title"
          height="100%"
          width="100%"
          :x-data="xData"
          :legend-label="['number','total']"
          :series="serise"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: '图表'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    xData() {
      const _1 = []
      for (const i of this.list) _1.push(i.Time.substr(5, 5))
      return _1
    },
    serise() {
      const _1 = []
      for (const i of this.list) _1.push(i.Count)
      const _2 = [
        this.dataItem('number', 'bar', 'rgba(0,191,183,1)', _1),
        this.dataItem('total', 'line', 'rgba(252,230,48,1)', _1)
      ]
      return _2
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dataItem(name, type, color, item) {
      return {
        name,
        type,
        stack: 'total',
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color,
            barBorderRadius: 0,
            label: {
              show: true,
              position: 'top',
              formatter(p) {
                return p.value > 0 ? p.value : ''
              }
            }
          }
        },
        data: item
      }
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.box /deep/ .el-dialog{
  padding: 0;
  margin-top: -1vh ! important;
}
</style>

