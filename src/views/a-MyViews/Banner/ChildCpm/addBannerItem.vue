<template>
  <el-dialog
    v-if="dialogVisible"
    title="添加轮播图"
    :visible.sync="dialogVisible"
    style="width: 1300px;"
    :before-close="handleCloseDialog"
  >
    <el-form width="300px">
      <el-form-item label-width="120px" label="图片标题">
        <el-input v-model="title" type="text" style="width: 360px" />
      </el-form-item>
      <el-form-item label-width="120px" label="图片描述">
        <el-input v-model="description" type="textarea" autosize style="width: 360px" />
      </el-form-item>
      <el-form-item label-width="120px" label="权重(顺序)">
        <el-input v-model="weight" type="number" min="1" max="100" style="width: 360px" />
      </el-form-item>
      <el-form-item label-width="120px" label="选择图片">
        <el-upload
          class="upload-demo"
          drag
          :limit="1"
          :on-exceed="() => { $message({ message: '最多只能上传一张图片', type: 'warning' }) }"
          action=""
          :on-change="handleChange"
          :auto-upload="false"
          style="display: inline-block; maigin-left: 120px"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog($event)">取 消</el-button>
      <el-button type="primary" @click="srueSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      dialogVisible: false,
      description: '',
      title: '',
      weight: '',
      file: null
    }
  },
  watch: {
    weight(n, o) {
      if (n > 100) this.weight = o
    },
    dialogVisible(n, o) {
      if (n) {
        this.description = ''
        this.title = ''
        this.weight = ''
      }
    }
  },
  methods: {
    handleChange(_1, _2) { this.file = _1.raw },
    handleCloseDialog(done) {
      this.$confirm('确认关闭？').then(() => {
        if (typeof done === 'function') done()
        this.dialogVisible = false
      }).catch(() => {})
    },
    srueSubmit() {
      if (!this.file) {
        this.$message({
          message: '请选择图片',
          type: 'warning'
        })
        return
      }
      if (!this.title) {
        this.$message({
          message: '请填写图片标题',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认提交？').then(() => {
        this.$emit('addBanner', {
          file: this.file,
          description: this.description,
          title: this.title,
          weight: this.weight
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .table-box >>> *:not(.no-inputs) .el-input__inner{
    color: #868686;
    border-bottom: 1px solid #DCDFE6;
    border-left: 0 solid rgb(225,243,253);
    border-top: 0 solid rgb(225,243,253);
    border-right: 0 solid rgb(225,243,253);
    padding: 0 solid rgb(225,243,253);
  }
</style>
