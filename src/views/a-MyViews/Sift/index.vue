<template>
  <div>
    添加节点：
    <el-cascader
      v-model="value"
      clearable
      :options="options"
      @change="handleChange"
    />
    <el-button
      type="primary"
      @click="btnClick"
    >111</el-button>
    <el-button
      type="primary"
      @click="surehandler"
    >确定筛选规则</el-button>
    <butterfly-vue
      :canvas-data="mockData"
      style="height: 90vh;"
      @deleteItem="deleteItem"
    />
  </div>
</template>

<script>
import 'butterfly-dag/pack/index.css'
import {
  mockData,
  addNode,
  delNode,
  addEdge,
  addRootNode,
  initData
} from './data'
import { ButterflyVue } from 'butterfly-vue'

import {
  getTbaleName,
  getFieldList,
  sureSift,
  getFilterTree,
  finishFilterConfiguration
} from '@/api/sift'

export default {
  components: {
    ButterflyVue
  },
  data() {
    return {
      mockData,
      value: [],
      options: [],
      activity_id: 0
    }
  },
  created() {
    this.activity_id = this.$store.getters.getCurrentActive.activity_id
    if (!this.activity_id) {
      this.$message.error('请先选择活动')
      setTimeout(() => { this.$router.push('/activity') }, 1000)
      return
    }
    console.log('------init-------')
    initData()
    getFilterTree(this.activity_id).then(res => {
      console.log(res)
      for (const item of res.Node) {
        if (item.id !== 1) addNode(item)
        else addRootNode(item)
      }
      for (const item of res.Edge) {
        addEdge(item)
      }
      if (res.Node.length === 0) {
        addRootNode({
          field_name: 'status', table_name: 'users', condition: '=1'
        })
      }
    })
    getTbaleName().then(res => {
      for (const item of res) {
        const { table_name, id } = item
        const _1 = { id, value: table_name, label: table_name, children: [] }
        getFieldList(table_name).then(res => {
          for (const item of res) _1.children.push({ value: item, label: item })
          this.options.push(_1)
        })
      }
    })
  },
  methods: {
    btnClick() {
      console.log(mockData)
    },
    // 添加一个节点
    handleChange(value) {
      if (value.length > 1) {
        addNode({
          table_name: value[0],
          field_name: value[1]
        })
      }
      this.value = []
    },
    // 删除一个节点
    deleteItem(item) { delNode(item) },
    // 确定筛选规则
    surehandler() {
      this.$confirm('确定这套筛选规则？').then(() => {
        sureSift({ data: this.mockData, activity_id: this.activity_id }).then(({ nodes, edges }) => {
          console.log(nodes, edges)
          finishFilterConfiguration({
            activity_id: this.activity_id,
            node: nodes,
            edge: edges
          }).then(res => {
            this.$message.success('筛选规则添加成功')
            setTimeout(() => { this.$router.push('/activity') }, 1000)
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
