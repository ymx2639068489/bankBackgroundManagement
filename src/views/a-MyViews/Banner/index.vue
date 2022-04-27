<template>
  <div style="background: rgb(238,241,246); height: calc(100vh - 84px)">
    <h2 style="margin-top: 0">拖拽式编辑，确定顺序无误后直接点击 确定提交 即可</h2>
    <div style="margin-left: 160px;">
      <el-button type="primary" size="default" @click="$refs.addBannerItem.dialogVisible = true">添加轮播图</el-button>
      <el-button type="primary" size="default" @click="srueSubmit">确定提交</el-button>
    </div>
    <div class="components-container board">
      <Kanban
        :key="1"
        :list="list1"
        :group="group"
        class="kanban todo"
        header-text="srue banners"
        :style-object="{ 'height': '70vh','overflow-y': 'auto', 'overflow-x': 'hidden' }"
        @itemClick="itemClick"
      />
      <Kanban
        :key="2"
        :list="list2"
        :group="group"
        class="kanban done"
        header-text="buffer images"
        :style-object="{ 'height': '70vh','overflow-y': 'auto', 'overflow-x': 'hidden' }"
        @itemClick="itemClick"
      />
    </div>
    <add-banner-item-cpm
      ref="addBannerItem"
      @addBanner="addBanner"
    />
    <update-banner
      ref="updateBanner"
      :current-img="currentImg"
      @updateBanner="updateBanner"
    />
  </div>
</template>
<script>
import {
  getBannerList,
  addBannerItem,
  updateBannerItem
} from '@/api/banner'

import Kanban from '@/components/Kanban'
import addBannerItemCpm from './ChildCpm/addBannerItem.vue'
import updateBanner from './ChildCpm/updateBanner.vue'
export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban,
    updateBanner,
    addBannerItemCpm
  },
  data() {
    return {
      group: 'mission',
      createList: [],
      list1: [],
      list2: [],
      finalList: [],
      currentImg: { description: '', title: '', ID: 0, weight: 0 }
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      getBannerList().then(res => {
        this.list1.splice(0, this.list1.length)
        if (!res.list) return
        for (let i = 0; i < res.list.length; i++) {
          let f = false
          const item = res.list[i]
          for (const j of this.list2) {
            if (item.ID === j.ID) {
              f = true
              break
            }
          }
          if (!f) {
            this.list1.push({
              ID: item.ID,
              slide_show_id: item.ID,
              description: item.description,
              title: item.title,
              url: item.host + '/' + item.relative_path,
              weight: item.weight
            })
          }
        }
        this.list1.sort((a, b) => { return a.weight - b.weight })
      })
    },
    addBanner(form) {
      addBannerItem(form).then(res => {
        this.$message({ type: 'success', message: res })
        this.getBanner()
        this.$refs.addBannerItem.dialogVisible = false
      })
    },
    itemClick(e) {
      this.currentImg = e
      this.$refs.updateBanner.dialogVisible = true
    },
    srueSubmit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let num = 0
      const updateList = []
      for (let i = 0; i < this.list1.length; i++) if (this.list1[i].weight !== i + 1) updateList.push(i)
      for (const i of updateList) {
        this.list1[i].weight = i + 1
        updateBannerItem(this.list1[i]).then(res => { num++ })
      }
      const si = setInterval(() => {
        if (num === updateList.length) {
          loading.close()
          this.$message({ type: 'success', message: '更新成功' })
          this.getBanner()
          clearInterval(si)
        }
      }, 1000)
    },
    updateBanner(form) {
      console.log(form)
      updateBannerItem(form).then(res => {
        this.$message({ type: 'success', message: res.msg })
        setTimeout(() => { this.$refs.updateBanner.dialogVisible = false }, 500)
        this.getBanner()
      })
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 800px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

