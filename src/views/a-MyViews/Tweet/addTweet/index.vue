<template>
  <div style="overflow: hidden; position: realtive;">
    <div>
      <div style="margin: 20px 0;">
        <span style="margin-left: 50px;">标题：</span><el-input v-model="title" placeholder="请输入标题" style="margin-left: 50px;width: 50%" />
      </div>
      <div style="margin-bottom: 20px;">
        <span style="margin-left: 50px;">作者：</span><el-input v-model="author" placeholder="请输入作者" style="margin-left: 50px;width: 50%" />
      </div>
      <el-upload
        class="upload-demo"
        drag
        action=""
        :on-change="handleChange"
        :auto-upload="false"
        :limit="1"
        style="margin-left: 150px;"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div style="margin: 20px 150px">
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="submit">确定发布</el-button>
      </div>
    </div>
    <markdown-editor
      ref="markdownEditor"
      v-model="content"
      :options="{
        hideModeSwitch:true,
        previewStyle:'tab'
      }"
      height="600px"
      style=""
    />
    <h2>预览</h2>
    <div style="height: 100%;">
      <div v-html="html" />
    </div>
  </div>
</template>

<script>
import { addArticle } from '@/api/tweet'
import MarkdownEditor from '@/components/MarkdownEditor'
const content = `
**This is test**
`
export default {
  components: { MarkdownEditor },
  data() {
    return {
      content,
      author: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      },
      title: '',
      front_cover: null,
      html: ''
    }
  },
  watch: {
    content() {
      this.html = this.$refs.markdownEditor.getHtml()
    }
  },
  mounted() {
    this.html = this.$refs.markdownEditor.getHtml()
  },
  methods: {
    handleChange(_1, _2) {
      this.front_cover = _1.raw
    },
    submit() {
      const { title, front_cover, author } = this
      const content = this.content
      const _1 = {
        title,
        front_cover,
        author,
        content
      }
      if (!_1.title) {
        this.$message({
          type: 'error',
          message: '请输入标题'
        })
        return
      }
      if (!_1.front_cover) {
        this.$message({
          type: 'error',
          message: '请上传封面'
        })
        return
      }
      if (!_1.author) {
        this.$message({
          type: 'error',
          message: '请输入作者'
        })
        return
      }
      if (!_1.content) {
        this.$message({
          type: 'error',
          message: '请输入内容'
        })
        return
      }
      addArticle(_1).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '发布成功'
        })
        this.$router.back()
      })
    }
  }
}
</script>

<style scoped>

</style>
