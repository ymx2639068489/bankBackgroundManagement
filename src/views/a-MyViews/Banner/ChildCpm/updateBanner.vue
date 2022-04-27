<template>
  <el-dialog
    v-if="dialogVisible"
    title="更新图片"
    :visible.sync="dialogVisible"
    style="width: 1160px;"
  >
    <el-form width="300px">
      <el-form-item label-width="120px" label="图片标题">
        <el-input v-model="Ntitle" type="text" style="width: 360px" />
      </el-form-item>
      <el-form-item label-width="120px" label="图片描述">
        <el-input v-model="Ndescription" type="textarea" autosize style="width: 360px" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="deleteBannerItem">删除当前轮播图</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="srueSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deleteBannerItem } from '@/api/banner'
export default {
  props: {
    currentImg: {
      type: Object,
      default: () => {
        return {
          description: '',
          title: '',
          id: 0,
          weight: 0
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      Ndescription: '',
      Ntitle: ''
    }
  },
  watch: {
    dialogVisible(n, o) {
      if (n) {
        this.Ndescription = this.currentImg.description
        this.Ntitle = this.currentImg.title
      }
    }
  },
  methods: {
    handleChange(_1, _2) { this.file = _1.raw },
    srueSubmit() {
      if (!this.Ntitle) {
        this.$message({
          message: '请填写图片标题',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认提交？').then(() => {
        this.$emit('updateBanner', {
          description: this.Ndescription,
          title: this.Ntitle,
          slide_show_id: this.currentImg.ID,
          weight: this.currentImg.weight
        })
      }).catch(() => {})
    },
    deleteBannerItem() {
      this.$confirm('确认删除？').then(() => {
        deleteBannerItem(this.id).then(res => {
          console.log(this.$parent.list2)
          for (let i = 0; i < this.$parent.list2.length; i++) {
            const item = this.$parent.list2[i]
            if (item.ID === this.id) {
              this.$parent.list2.splice(i, 1)
              break
            }
          }
          this.$message({ message: '删除成功', type: 'success' })
          this.dialogVisible = false
          this.$parent.getBanner()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.dialog-footer{
  text-align: center;
}
</style>
