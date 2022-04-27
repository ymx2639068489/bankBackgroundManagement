<template>
  <div>
    <div class="upload1">
      <el-upload
        drag
        action=""
        :auto-upload="false"
        :on-change="onChange"
        :limit="1"
        :on-exceed="onExceed"
        accept="application/vnd.android.package-archive"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">please upload file for 'apk'</div>
      </el-upload>
      <el-form :model="ruleForm" style="margin: 30px -100px;" label-width="100px">
        <el-form-item label="版本号" prop="name">
          <el-input v-model="ruleForm.version" style="width: 360px;" />
        </el-form-item>
        <el-form-item label="更新内容" prop="desc">
          <el-input v-model="ruleForm.content" type="textarea" style="width: 360px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card style="width: 700px;margin-left: 80px;">
      <div class="table">
        <el-table
          :data="tableData"
          stripe
          style="width: 650px"
        >
          <el-table-column
            prop="Version"
            label="版本号"
            width="120"
          />
          <el-table-column
            prop="Content"
            label="更新内容"
            width="200"
          />
          <el-table-column
            prop="CreatedAt"
            label="更新时间"
            width="200"
          />
          <el-table-column
            prop="address"
            label="文件"
          >
            <template slot-scope="scope">
              <div v-if="scope" />
              <el-tag
                :type="'primary'"
                disable-transitions
              >
                <a :href="'http://114.132.236.147/gxa' + scope.row.DownloadURL">点击下载文件</a>
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>

import {
  appIterate,
  getAppIterateList
} from '@/api/APP'

export default {
  data() {
    return {
      file: null,
      ruleForm: {
        version: '',
        content: ''
      },
      tableData: []
    }
  },
  created() {
    this.getAppIterateList()
  },
  methods: {
    onChange(_1, _2) {
      console.log(_1, _2)
      this.file = _1.raw
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: '仅上传一个 apk 文件'
      })
    },
    submitForm() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      appIterate(this.ruleForm.version, this.ruleForm.content, this.file).then(res => {
        loading.close()
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.getAppIterateList()
      }).catch(err => {
        loading.close()
        console.log(err)
      })
    },
    getAppIterateList() {
      getAppIterateList().then(res => {
        console.log(res)
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.upload1 >>> .upload{
  position: relative;
}
.upload1{
  margin-top: 50px;
  margin-left: 260px;
}
.el-upload__tip{
  font-size: 24px;
}
</style>
