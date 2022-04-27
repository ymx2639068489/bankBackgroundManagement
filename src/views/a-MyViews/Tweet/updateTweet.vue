<template>
  <div style="overflow: hidden; position: realtive;">
    <div>
      <div style="margin: 20px 0;">
        <span style="margin-left: 50px;">标题：</span><el-input v-model="title" placeholder="请输入标题" style="margin-left: 50px;width: 50%" />
      </div>
      <div style="margin-bottom: 20px;">
        <span style="margin-left: 50px;">作者：</span><el-input v-model="author" placeholder="请输入作者" style="margin-left: 50px;width: 50%" />
      </div>
      <el-button style="margin: 20px 50px 20px 150px;" @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="submit">确定发布</el-button>
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
import { getArticleContent, updateArticle } from '@/api/tweet'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: { MarkdownEditor },
  data() {
    return {
      content: '',
      html: '',
      author: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      },
      title: ''
    }
  },
  watch: {
    content2: {
      handler(_n, _o) {
        this.html = this.$refs.markdownEditor.getHtml()
      }
    }
  },
  created() {
    getArticleContent({ article_id: Number(this.$route.params.id) }).then(res => {
      this.author = res.data.author
      this.content = res.data.content
      this.title = res.data.title
    })
  },
  mounted() {
    setTimeout(() => { this.html = this.$refs.markdownEditor.getHtml() }, 1000)
  },
  methods: {
    handleChange(_1, _2) {
      this.front_cover = _1.raw
    },
    submit() {
      const { title, author } = this
      const content = this.html
      const _1 = {
        title,
        author,
        content,
        article_id: Number(this.$route.params.id)
      }
      if (!_1.title) {
        this.$message({
          type: 'error',
          message: '请输入标题'
        })
        return
      }
      if (!_1.article_id) {
        this.$message({
          type: 'error',
          message: '请选择文章'
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
      console.log(_1)
      updateArticle(_1).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$router.back()
      })
    }
  }
}
</script>

<style scoped>

</style>
