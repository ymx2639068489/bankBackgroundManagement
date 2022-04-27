<template>
  <div class="box">
    <el-upload
      class="upload-demo"
      drag
      multiple
      action=""
      list-type="picture-card"
      :on-change="handleChange"
      :auto-upload="false"
      :show-file-list="false"
      style="display: inline-block; maigin-left: 120px;"
    >
      <i class="el-icon-upload" />
    </el-upload>
    <div style="margin: 25px 130px;">
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <el-button style="margin: 30px 50px" type="primary" size="default" @click="submit">点击上传</el-button>
    </div>
    <div class="components-container board">
      <Kanban
        :key="1"
        :list="list1"
        :group="group"
        class="kanban todo"
        header-text="预览顺序"
        :style-object="{ 'height': '70vh','overflow-y': 'auto', 'overflow-x': 'hidden' }"
      />
    </div>
  </div>
</template>

<script>
import {
  getActivityGuidance,
  addGuidanceInformation
} from '@/api/activity'
import Kanban from '@/components/Kanban'
export default {
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      activity_id: null,
      file: null,
      list1: [],
      f: false
    }
  },
  created() {
    this.activity_id = this.$store.getters.getCurrentActive.activity_id
    if (!this.activity_id) {
      this.$message({
        type: 'error',
        message: '请先选择活动'
      })
      this.$router.push('/activity/activityList')
      return
    }
    this.getActivityGuidance()
  },
  methods: {
    getActivityGuidance() {
      getActivityGuidance(this.activity_id).then(res => {
        this.list1.splice(0, this.list1.length)
        if (res.guidance_information.length) this.f = true
        for (const i of res.guidance_information) {
          this.list1.push({
            ID: i.ID,
            url: i.host + '/' + i.relative_path
          })
        }
      })
    },
    handleChange(_1, _2) {
      this.list1.splice(0, this.list1.length)
      for (const item of _2) {
        this.list1.push({
          file: item.raw,
          url: item.url
        })
      }
    },
    submit() {
      this.file = []
      for (const item of this.list1) {
        this.file.push(item.file)
      }
      const fileNumber = this.file.length
      if (fileNumber === 0) {
        this.$message({
          type: 'error',
          message: '请先上传图片'
        })
        return
      }
      const _1 = new FormData()
      for (const item of this.file) _1.append('file', item)
      _1.append('activity_id', this.activity_id)
      _1.append('fileNumber', fileNumber)
      addGuidanceInformation(_1, this.f).then(res => {
        this.$message({ type: 'success', message: res })
        this.getActivityGuidance()
        this.$router.push('/activity/activityList')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.board {
  position: absolute;
  top: 0;
  left: 200px;
  width: 310px;
  margin-left: 300px;
  // display: flex;
  // justify-content: space-around;
  // flex-direction: row;
  // align-items: flex-start;
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
.upload-demo{
  margin: 80px 50px !important;
}
</style>
