(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc7a4180"],{"16d8":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:t.id}})},o=[],a=i("5530"),r=(i("b680"),i("a7be"),i("44f8"),i("a6e0"),i("547e")),s=i.n(r),u={minHeight:"200px",previewStyle:"vertical",useCommandShortcut:!0,useDefaultHTMLSanitizer:!0,usageStatistics:!1,hideModeSwitch:!1,toolbarItems:["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"]},d={name:"MarkdownEditor",props:{value:{type:String,default:""},id:{type:String,required:!1,default:function(){return"markdown-editor-"+ +new Date+(1e3*Math.random()).toFixed(0)}},options:{type:Object,default:function(){return u}},mode:{type:String,default:"markdown"},height:{type:String,required:!1,default:"300px"},language:{type:String,required:!1,default:"en_US"}},data:function(){return{editor:null}},computed:{editorOptions:function(){var t=Object.assign({},u,this.options);return t.initialEditType=this.mode,t.height=this.height,t.language=this.language,t}},watch:{value:function(t,e){t!==e&&t!==this.editor.getValue()&&this.editor.setValue(t)},language:function(t){this.destroyEditor(),this.initEditor()},height:function(t){this.editor.height(t)},mode:function(t){this.editor.changeMode(t)}},mounted:function(){this.initEditor()},destroyed:function(){this.destroyEditor()},methods:{initEditor:function(){var t=this;this.editor=new s.a(Object(a["a"])({el:document.getElementById(this.id)},this.editorOptions)),this.value&&this.editor.setValue(this.value),this.editor.on("change",(function(){t.$emit("input",t.editor.getValue())}))},destroyEditor:function(){this.editor&&(this.editor.off("change"),this.editor.remove())},setValue:function(t){this.editor.setValue(t)},getValue:function(){return this.editor.getValue()},setHtml:function(t){this.editor.setHtml(t)},getHtml:function(){return this.editor.getHtml()}}},c=d,l=i("2877"),h=Object(l["a"])(c,n,o,!1,null,null,null);e["a"]=h.exports},"3fae":function(t,e,i){"use strict";i.d(e,"a",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"b",(function(){return r})),i.d(e,"d",(function(){return s}));i("d3b7"),i("a9e3");var n=i("b775");function o(t){var e=new FormData;return e.append("title",t.title),e.append("content",t.content),e.append("author",t.author),e.append("front_cover",t.front_cover),new Promise((function(t,i){Object(n["a"])({url:"/api/article/publish",method:"post",data:e}).then((function(e){0!==e.code?i(e.msg):t(e)}))}))}function a(t){t.page=Number(t.page),t.page_size=Number(t.page_size),t.status=Number(t.status);var e=t.page,i=t.page_size,o=t.status;return new Promise((function(t,a){Object(n["a"])({url:"/api/article/getList",method:"post",data:JSON.stringify({page:e,page_size:i,status:o})}).then((function(e){0!==e.code?a(e.msg):t(e)}))}))}function r(t){var e=t.article_id;return new Promise((function(t,i){Object(n["a"])({url:"/api/article/getArticleContentAdmin",method:"post",data:JSON.stringify({article_id:e})}).then((function(e){0!==e.code?i(e.msg):t(e)}))}))}function s(t){var e=new FormData;return e.append("article_id",t.article_id),e.append("title",t.title),e.append("author",t.author),e.append("content",t.content),new Promise((function(t,i){Object(n["a"])({url:"/api/article/update",method:"put",data:e}).then((function(e){0!==e.code?i(e.msg):t(e)}))}))}},"7afb":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{overflow:"hidden",position:"realtive"}},[i("div",[i("div",{staticStyle:{margin:"20px 0"}},[i("span",{staticStyle:{"margin-left":"50px"}},[t._v("标题：")]),i("el-input",{staticStyle:{"margin-left":"50px",width:"50%"},attrs:{placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("div",{staticStyle:{"margin-bottom":"20px"}},[i("span",{staticStyle:{"margin-left":"50px"}},[t._v("作者：")]),i("el-input",{staticStyle:{"margin-left":"50px",width:"50%"},attrs:{placeholder:"请输入作者"},model:{value:t.author,callback:function(e){t.author=e},expression:"author"}})],1),i("el-upload",{staticClass:"upload-demo",staticStyle:{"margin-left":"150px"},attrs:{drag:"",action:"","on-change":t.handleChange,"auto-upload":!1,limit:1}},[i("i",{staticClass:"el-icon-upload"}),i("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),i("em",[t._v("点击上传")])]),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])]),i("div",{staticStyle:{margin:"20px 150px"}},[i("el-button",{on:{click:function(e){return t.$router.back()}}},[t._v("返回")]),i("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确定发布")])],1)],1),i("markdown-editor",{ref:"markdownEditor",attrs:{options:{hideModeSwitch:!0,previewStyle:"tab"},height:"600px"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),i("h2",[t._v("预览")]),i("div",{staticStyle:{height:"100%"}},[i("div",{domProps:{innerHTML:t._s(t.html)}})])],1)},o=[],a=i("3fae"),r=i("16d8"),s="\n**This is test**\n",u={components:{MarkdownEditor:r["a"]},data:function(){return{content:s,author:"",languageTypeList:{en:"en_US",zh:"zh_CN",es:"es_ES"},title:"",front_cover:null,html:""}},watch:{content:function(){this.html=this.$refs.markdownEditor.getHtml()}},mounted:function(){this.html=this.$refs.markdownEditor.getHtml()},methods:{handleChange:function(t,e){this.front_cover=t.raw},submit:function(){var t=this,e=this.title,i=this.front_cover,n=this.author,o=this.content,r={title:e,front_cover:i,author:n,content:o};r.title?r.front_cover?r.author?r.content?Object(a["a"])(r).then((function(e){console.log(e),t.$message({type:"success",message:"发布成功"}),t.$router.back()})):this.$message({type:"error",message:"请输入内容"}):this.$message({type:"error",message:"请输入作者"}):this.$message({type:"error",message:"请上传封面"}):this.$message({type:"error",message:"请输入标题"})}}},d=u,c=i("2877"),l=Object(c["a"])(d,n,o,!1,null,"5a37406f",null);e["default"]=l.exports}}]);