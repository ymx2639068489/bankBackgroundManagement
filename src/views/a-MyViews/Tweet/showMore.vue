<template>
  <div>
    <div>
      <div v-if="audit_status === -1" class="audit_status">未通过审核： 理由：{{ audit_message }} </div>
      <div class="title">
        {{ title }}
      </div>
      <div class="author">
        作者：{{ author }}
      </div>
      <div class="updated_at">
        发布/更新时间：{{ updated_at }}
      </div>
    </div>
    <div class="content">
      <div v-html="html" />
    </div>
    <markdown-editor
      v-show="false"
      ref="markdownEditor"
      v-model="content"
      :options="{
        hideModeSwitch:true,
        previewStyle:'tab'
      }"
      height="600px"
      style=""
    />
  </div>
</template>

<script>
import { getArticleContent } from '@/api/tweet'
import { parseTime } from '@/utils/index'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: {
    MarkdownEditor
  },
  props: {

  },
  data() {
    return {
      title: '',
      author: '',
      content: '',
      updated_at: '',
      html: '',
      audit_message: '',
      audit_status: 0
    }
  },
  created() {
    getArticleContent({ article_id: Number(this.$route.params.id) }).then(res => {
      this.title = res.data.title
      this.author = res.data.author
      this.content = res.data.content
      this.audit_message = res.data.audit_message
      this.audit_status = res.data.audit_status
      this.updated_at = parseTime(this.$IsoToString(res.data.updated_at))
    })
  },
  mounted() {
    setTimeout(() => { this.html = this.$refs.markdownEditor.getHtml() }, 1000)
  }
}
</script>

<style scoped>
.title{
  margin-top: 40px;
  width: 100vw;
  font-size: 40px;
  text-align: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.audit_status{
  width: 100vw;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
.updated_at{
  width: 100vw;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.author{
  width: 100vw;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.content{
  margin-left: 23vw;
  margin-right: 20vw;
  min-width: 580px;
}
</style>
