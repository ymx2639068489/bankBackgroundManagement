(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04a885e0"],{"185b":function(t,e,n){"use strict";n("a456")},"3fae":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return r})),n.d(e,"d",(function(){return s}));n("d3b7"),n("a9e3");var i=n("b775");function a(t){var e=new FormData;return e.append("title",t.title),e.append("content",t.content),e.append("author",t.author),e.append("front_cover",t.front_cover),new Promise((function(t,n){Object(i["a"])({url:"/api/article/publish",method:"post",data:e}).then((function(e){0!==e.code?n(e.msg):t(e)}))}))}function l(t){t.page=Number(t.page),t.page_size=Number(t.page_size),t.status=Number(t.status);var e=t.page,n=t.page_size,a=t.status;return new Promise((function(t,l){Object(i["a"])({url:"/api/article/getList",method:"post",data:JSON.stringify({page:e,page_size:n,status:a})}).then((function(e){0!==e.code?l(e.msg):t(e)}))}))}function r(t){var e=t.article_id;return new Promise((function(t,n){Object(i["a"])({url:"/api/article/getArticleContentAdmin",method:"post",data:JSON.stringify({article_id:e})}).then((function(e){0!==e.code?n(e.msg):t(e)}))}))}function s(t){var e=new FormData;return e.append("article_id",t.article_id),e.append("title",t.title),e.append("author",t.author),e.append("content",t.content),new Promise((function(t,n){Object(i["a"])({url:"/api/article/update",method:"put",data:e}).then((function(e){0!==e.code?n(e.msg):t(e)}))}))}},"57c6":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("div",{directives:[{name:"show",rawName:"v-show",value:0===t.showList.length,expression:"showList.length === 0"}]},[t._v(" 暂无数据 ")]),t._l(t.showList,(function(e,i){return n("list-item",{key:i,attrs:{item:e},on:{itemUpdateClick:t.itemUpdateClick,itemCollectClick:t.itemCollectClick}})}))],2),n("el-pagination",{ref:"page",staticStyle:{"margin-left":"30vw"},attrs:{background:"","hide-on-single-page":!0,layout:"prev, pager, next",total:t.totalPages},on:{"current-change":t.handleCurrentChange}})],1)},a=[],l=n("2909"),r=(n("a434"),n("a9e3"),n("b146")),s=n("3fae"),u=n("77c4"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("el-card",{attrs:{"body-style":{padding:"0px",height:"300px",width:"400px"}}},[n("img",{staticClass:"image",attrs:{src:t.item.front_cover.host+"/"+t.item.front_cover.relative_path},nativeOn:{click:function(e){return t.$router.push("/tweet/showMore/"+t.item.article_id)}}}),n("div",{staticClass:"bottom-top",staticStyle:{padding:"14px"}},[n("span",[t._v(t._s(t.item.article_title))]),n("div",{staticClass:"bottom clearfix"},[n("el-popover",{attrs:{placement:"top-end",width:"200",trigger:"click"}},[n("div",[n("el-popover",{attrs:{placement:"top",width:"180"},model:{value:t.visible1,callback:function(e){t.visible1=e},expression:"visible1"}},[n("p",[t._v("请输入拒绝理由吗？")]),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-input",{attrs:{type:"text"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.visible1=!1}}},[t._v("取消")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.collect(t.item.article_id)}}},[t._v("确定")])],1),n("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("拒绝")])],1),n("el-popover",{staticStyle:{"margin-left":"20px"},attrs:{placement:"top",width:"180"},model:{value:t.visible2,callback:function(e){t.visible2=e},expression:"visible2"}},[n("p",[t._v("确定通过吗？")]),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.visible2=!1}}},[t._v("取消")]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.update(t.item.article_id)}}},[t._v("确定")])],1),n("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("通过")])],1)],1),n("el-button",{staticClass:"button",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("操作按钮")])],1)],1)])])],1)},o=[],d={props:{item:{type:Object,default:function(){return{}}}},data:function(){return{visible1:!1,visible2:!1,message:""}},methods:{collect:function(t){this.$emit("itemCollectClick",t,this.message),this.visible1=!1},update:function(t){this.$emit("itemUpdateClick",t),this.visible2=!1}}},p=d,f=(n("185b"),n("2877")),v=Object(f["a"])(p,c,o,!1,null,"337da5b2",null),m=v.exports,b={components:{listItem:m},data:function(){return{tweet_status_list:r["l"],tweet_status_map:r["m"],totalPages:0,form:{status:1,page:1,page_size:10},showList:[]}},created:function(){this.getTweetList()},methods:{goToSearch:function(){this.form.page=1,this.getTweetList()},getTweetList:function(){var t=this;Object(s["c"])(this.form).then((function(e){var n;if(t.showList.splice(0,t.showList.length),e.data.list){var i=e.data.list;(n=t.showList).push.apply(n,Object(l["a"])(i)),t.totalPages=10*Math.ceil(e.data.total/t.form.page_size)}}))},handleCurrentChange:function(t){this.form.page=t,this.getTweetList()},itemCollectClick:function(t,e){var n=this;Object(u["b"])({articleID:Number(t),message:e,result:-1}).then((function(t){console.log(t),n.$message({type:"success",message:"拒绝成功"}),n.getTweetList()}))},itemUpdateClick:function(t){var e=this;Object(u["b"])({articleID:Number(t),message:"",result:2}).then((function(t){e.$message({type:"success",message:"审核成功"}),e.getTweetList()}))}}},g=b,h=Object(f["a"])(g,i,a,!1,null,"81b59a12",null);e["default"]=h.exports},"77c4":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return r}));n("d3b7");var i=n("b775");function a(t){var e=t.activityID,n=t.message,a=t.result;return new Promise((function(t,l){Object(i["a"])({url:"/api/audit/activity",method:"post",data:JSON.stringify({activityID:e,message:n,result:a})}).then((function(e){t(e)})).catch((function(t){l(t)}))}))}function l(t){var e=t.articleID,n=t.message,a=t.result;return new Promise((function(t,l){Object(i["a"])({url:"/api/audit/article",method:"post",data:JSON.stringify({articleID:e,message:n,result:a})}).then((function(e){t(e)})).catch((function(t){l(t)}))}))}function r(t){var e=t.productID,n=t.message,a=t.result;return new Promise((function(t,l){Object(i["a"])({url:"/api/audit/product",method:"post",data:JSON.stringify({productID:e,message:n,result:a})}).then((function(e){t(e)})).catch((function(t){l(t)}))}))}},a456:function(t,e,n){},b146:function(t,e,n){"use strict";n.d(e,"i",(function(){return i})),n.d(e,"j",(function(){return a})),n.d(e,"k",(function(){return l})),n.d(e,"d",(function(){return r})),n.d(e,"e",(function(){return s})),n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o})),n.d(e,"p",(function(){return d})),n.d(e,"q",(function(){return p})),n.d(e,"n",(function(){return f})),n.d(e,"o",(function(){return v})),n.d(e,"f",(function(){return m})),n.d(e,"g",(function(){return b})),n.d(e,"h",(function(){return g})),n.d(e,"l",(function(){return h})),n.d(e,"m",(function(){return w}));var i=[{value:2,label:"审核通过"},{value:1,label:"等待审核"},{value:0,label:"测试中"},{value:-1,label:"审核失败"}],a={2:"审核通过",1:"等待审核",0:"测试中","-1":"审核失败"},l=[{value:1,label:"存款"},{value:2,label:"贷款"}],r=[{value:0,label:"暂不定义"},{value:1,label:"年利率"},{value:2,label:"月利率"},{value:3,label:"日利率"}],s={0:"暂不定义",1:"年利率",2:"月利率",3:"日利率"},u=[{value:1,label:"筛选配置"},{value:2,label:"资源配置"},{value:3,label:"等待审核"},{value:4,label:"等待开始"}],c={1:"筛选配置",2:"资源配置",3:"等待审核",4:"等待开始"},o=[{value:1,label:"等待审核"},{value:2,label:"审核成功"},{value:-1,label:"审核失败"}],d=[{value:1,label:"正常"},{value:-1,label:"冻结"},{value:0,label:"测试"}],p={1:"正常","-1":"冻结",0:"测试"},f=[{label:"女",value:1},{label:"男",value:2},{label:"未知",value:0}],v={1:"女",2:"男",0:"未知"},m=[{value:1,label:"等待处理"},{value:2,label:"处理成功"},{value:-1,label:"订单失败"}],b={1:"等待处理",2:"处理成功","-1":"订单失败"},g={1:"未支付",2:"支付","-1":"支付失败"},h=[{value:1,label:"等待审核"},{value:2,label:"审核成功"},{value:-1,label:"审核失败"},{value:0,label:"查看所有"}],w={1:"等待审核",2:"审核成功","-1":"审核失败"}}}]);