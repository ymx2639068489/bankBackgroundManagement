(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9e0461bc"],{4997:function(t,e,i){},"82a8":function(t,e,i){"use strict";i("a8a7")},a8a7:function(t,e,i){},b146:function(t,e,i){"use strict";i.d(e,"i",(function(){return a})),i.d(e,"j",(function(){return n})),i.d(e,"k",(function(){return s})),i.d(e,"d",(function(){return c})),i.d(e,"e",(function(){return r})),i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return u})),i.d(e,"a",(function(){return l})),i.d(e,"p",(function(){return d})),i.d(e,"q",(function(){return f})),i.d(e,"n",(function(){return m})),i.d(e,"o",(function(){return v})),i.d(e,"f",(function(){return p})),i.d(e,"g",(function(){return _})),i.d(e,"h",(function(){return g})),i.d(e,"l",(function(){return h})),i.d(e,"m",(function(){return b}));var a=[{value:2,label:"审核通过"},{value:1,label:"等待审核"},{value:0,label:"测试中"},{value:-1,label:"审核失败"}],n={2:"审核通过",1:"等待审核",0:"测试中","-1":"审核失败"},s=[{value:1,label:"存款"},{value:2,label:"贷款"}],c=[{value:0,label:"暂不定义"},{value:1,label:"年利率"},{value:2,label:"月利率"},{value:3,label:"日利率"}],r={0:"暂不定义",1:"年利率",2:"月利率",3:"日利率"},o=[{value:1,label:"筛选配置"},{value:2,label:"资源配置"},{value:3,label:"等待审核"},{value:4,label:"等待开始"}],u={1:"筛选配置",2:"资源配置",3:"等待审核",4:"等待开始"},l=[{value:1,label:"等待审核"},{value:2,label:"审核成功"},{value:-1,label:"审核失败"}],d=[{value:1,label:"正常"},{value:-1,label:"冻结"},{value:0,label:"测试"}],f={1:"正常","-1":"冻结",0:"测试"},m=[{label:"女",value:1},{label:"男",value:2},{label:"未知",value:0}],v={1:"女",2:"男",0:"未知"},p=[{value:1,label:"等待处理"},{value:2,label:"处理成功"},{value:-1,label:"订单失败"}],_={1:"等待处理",2:"处理成功","-1":"订单失败"},g={1:"未支付",2:"支付","-1":"支付失败"},h=[{value:1,label:"等待审核"},{value:2,label:"审核成功"},{value:-1,label:"审核失败"},{value:0,label:"查看所有"}],b={1:"等待审核",2:"审核成功","-1":"审核失败"}},b6a1:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAqBAMAAAA686QvAAAAAXNSR0IArs4c6QAAABtQTFRF////YmJisbGx6+vr19fXxcXFiYmJnZ2ddHR0LuJk8QAAARRJREFUKM+tk7uOwjAQRc0jQMmwgFxCQNSLohWUKQI1SImghD8ACQgly0P8NsaOPWMTqLhVdDS+uZ4ZM/ZZpYkfhy/QByG+c3AXlG4WnYPWhdCqocA7aLxGDA2DK0BlytcW1uVFiwLP0hdsDCuFt/LoM/lZxm+qHLKk7j2PD6ULCd0QV7pmP5fmtSyXx8MKiVjQuWKd9IT9uKe/zEuP8vsHm6dClcFEkfmgFwQsCEYuBmgzfZ8W7YiD31SrX+6TmCXJEr3nJEkJA8o+QD+KWBRNVX/obNB7Q6eAOEQ/gjkZA8EthYcOXtkjPlBrZ3vI/ozzBi/K/wlt42qO8nZNlHcNvVqPQfOz80gGeVTob5H6M/ZVPQChvjk2WsacTQAAAABJRU5ErkJggg=="},bf05:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var a={shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}},c910:function(t,e,i){"use strict";i("4997")},ca41:function(t,e,i){"use strict";i.d(e,"f",(function(){return s})),i.d(e,"c",(function(){return c})),i.d(e,"g",(function(){return r})),i.d(e,"i",(function(){return o})),i.d(e,"d",(function(){return u})),i.d(e,"b",(function(){return l})),i.d(e,"a",(function(){return d})),i.d(e,"e",(function(){return f})),i.d(e,"h",(function(){return m}));i("d3b7"),i("a9e3"),i("a4d3"),i("e01a"),i("ac1f"),i("466d");var a=i("b775"),n=i("ed08");function s(t){var e=t.activity_status,i=t.audit_status,n=t.page,s=t.page_size,c=t.start_time,r=t.ending_time;return new Promise((function(t,o){Object(a["a"])({url:"/api/spikeActivity/list",method:"post",data:JSON.stringify({activity_status:e,audit_status:i,page:n,page_size:s,start_time:c,ending_time:r})}).then((function(e){0!==e.code&&o(e.msg),t(e.data)}))}))}function c(t){return new Promise((function(e,i){Object(a["a"])({url:"/api//spikeActivity/delete",method:"delete",data:JSON.stringify({activity_id:t})}).then((function(t){0!==t.code&&i(t.msg),e(t.data)}))}))}function r(t){return new Promise((function(e,i){Object(a["a"])({url:"/api/spikeActivity/getActivityUserRecord",method:"post",data:JSON.stringify({activity_id:t})}).then((function(t){0!==t.code&&i(t.msg),e(t.data)}))}))}function o(t){t.product_id=Number(t.product_id),console.log(t),t.start_time=Object(n["d"])(t.start_time,"{y}-{m}-{d} {h}:{i}:{s}"),t.ending_time=Object(n["d"])(t.ending_time,"{y}-{m}-{d} {h}:{i}:{s}"),console.log(t);var e=t.product_id,i=t.activity_id,s=t.activity_name,c=t.description,r=t.ending_time,o=t.roles_introduction,u=t.start_time;return new Promise((function(t,n){Object(a["a"])({url:"/api/spikeActivity/update",method:"put",data:JSON.stringify({activity_id:i,activity_name:s,description:c,ending_time:r,product_id:e,roles_introduction:o,start_time:u})}).then((function(e){0!==e.code?n(e.msg):t(e.data)})).catch((function(t){n(t)}))}))}function u(t){return new Promise((function(e,i){Object(a["a"])({url:"/api/spikeActivity/getActivityGuidanceInformation",method:"post",data:JSON.stringify({activity_id:t})}).then((function(t){0!==t.code&&i(t.msg),e(t.data)}))}))}function l(t,e){return new Promise((function(i,n){Object(a["a"])({url:e?"/api/spikeActivity/updateGuidanceInformation":"/api/spikeActivity/addGuidanceInformation",method:"post",data:t}).then((function(t){i(t.msg)}))}))}function d(t){var e=Number(t.product_id.match(/[0-9]+/)),i=Object(n["d"])(t.ending_time),s=Object(n["d"])(t.start_time),c=t.activity_name,r=t.description,o=t.roles_introduction;return new Promise((function(t,n){Object(a["a"])({url:"/api/spikeActivity/release",method:"post",data:JSON.stringify({activity_name:c,description:r,ending_time:i,product_id:e,roles_introduction:o,start_time:s})}).then((function(e){t(e.msg)}))}))}function f(t){return new Promise((function(e,i){Object(a["a"])({url:"/api/spikeActivity/getActivityInfoByID",method:"post",data:JSON.stringify({activity_id:t})}).then((function(t){0!==t.code&&i(t.msg),e(t.data)}))}))}function m(t){t.activity_id=Number(t.activity_id),t.order_status=Number(t.order_status),t.page=Number(t.page),t.page_size=Number(t.page_size);var e=t.activity_id,i=t.order_status,n=t.page,s=t.page_size;return new Promise((function(t,c){Object(a["a"])({url:"/api/order/getOrderListByActivityID",method:"post",data:JSON.stringify({activity_id:e,order_status:i,page:n,page_size:s})}).then((function(e){0!==e.code&&c(e.msg),t(e.data)}))}))}},dc86:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("sift",{ref:"sift"}),i("list-cpm",{attrs:{list:t.list},on:{lookGoods:t.lookGoods}}),i("pages",{attrs:{"total-pages":t.totalPages},on:{pageChange:t.pageChange}})],1)},n=[],s=(i("a9e3"),i("ca41")),c=i("b146"),r=i("ed08"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"item add",nativeOn:{click:function(e){return t.addActivity(e)}}},[a("span",[t._v("+ 发布新活动")])]),t.list&&t.list.length>0?t._l(t.list,(function(e,n){return a("el-card",{key:n,staticClass:"item"},[a("div",{staticClass:"content"},[a("span",{staticClass:"item-label"},[t._v(" "+t._s(t.status(e))+" ")]),a("h2",{staticStyle:{overflow:"hidden"}},[a("img",{attrs:{src:i("b6a1"),width:"24px",height:"24px"}}),a("span",[t._v(t._s(e.activity_name))])]),a("div",{staticStyle:{display:"flex","font-size":"20px","margin-bottom":"40px"}},[a("div",{staticStyle:{flex:"1"}},[a("span",{staticClass:"lable-numbers"},[t._v(" 关注数: ")]),t._v(" "+t._s(t.showNumber(e.number_of_favorites))+" ")]),a("div",{staticStyle:{flex:"1"}},[a("span",{staticClass:"lable-numbers"},[t._v(" 参与人数: ")]),t._v(" "+t._s(t.showNumber(e.number_of_participants))+" ")])]),a("span",{staticStyle:{"font-size":"19.5px"}},[t._v(t._s(t.$IsoToString(e.start_time))+" - "+t._s(t.$IsoToString(e.ending_time)))])]),a("div",{staticClass:"bottom"},[a("el-popover",{staticStyle:{"margin-right":"10px"},attrs:{placement:"top-start",width:"175",trigger:"hover"}},[a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:4===e.activity_status,expression:"item.activity_status === 4"}],attrs:{icon:"el-icon-search",title:"查看活动流量"},on:{click:function(i){return t.firstBtnClick(e)}}},[t._v("查看活动流量")]),t._v(" "),a("br"),a("el-button",{attrs:{icon:"el-icon-search",title:"查看对应商品"},on:{click:function(i){return t.fifthBthClick(e)}}},[t._v("查看对应商品")]),t._v(" "),a("br"),a("el-button",{directives:[{name:"show",rawName:"v-show",value:4===e.activity_status,expression:"item.activity_status === 4"}],attrs:{icon:"el-icon-search",title:"查看订单"},on:{click:function(i){return t.seventhBthClick(e)}}},[t._v("查看活动订单")]),t._v(" "),a("br"),a("el-button",{directives:[{name:"show",rawName:"v-show",value:4===e.activity_status,expression:"item.activity_status === 4"}],attrs:{icon:"el-icon-search",title:"查看库存缓存"},on:{click:function(i){return t.eighthBthClick(e)}}},[t._v("查看库存缓存")]),t._v(" "),a("br")],1),a("el-button",{attrs:{slot:"reference",icon:"el-icon-search",circle:"",title:"查看对应信息"},slot:"reference"})],1),a("el-button",{attrs:{icon:"el-icon-delete",circle:"",title:"删除活动"},on:{click:function(i){return t.secondBtnClick(e)}}}),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.activity_status<=3,expression:"item.activity_status <= 3"}],attrs:{icon:"el-icon-edit",circle:"",title:"更新活动细节"},on:{click:function(i){return t.thirdBtnClick(e)}}}),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.activity_status<=3,expression:"item.activity_status <= 3"}],attrs:{icon:"el-icon-plus",circle:"",title:"添加/更新引导信息(广告等)"},on:{click:function(i){return t.fourthBtnClick(e)}}}),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.activity_status<=3,expression:"item.activity_status <= 3"}],attrs:{icon:"el-icon-setting",circle:"",title:"设置筛选条件"},on:{click:function(i){return t.sixthBthClick(e)}}}),a("el-button",{directives:[{name:"show",rawName:"v-show",value:4===e.activity_status&&new Date<new Date(e.ending_time),expression:"item.activity_status === 4 && new Date() < new Date(item.ending_time)"}],attrs:{icon:"el-icon-s-promotion",circle:"",title:"提前加载缓存"},on:{click:function(i){return t.ninthBotClick(e)}}}),a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1===e.audit_status,expression:"item.audit_status === -1"}],attrs:{icon:"el-icon-circle-close",circle:"",title:"查看审核失败原因"},on:{click:function(i){return t.showAudit(e)}}})],1)])})):[a("el-card",{staticClass:"item",staticStyle:{"line-height":"200px"}},[a("span",{staticStyle:{"margin-left":"140px"}},[t._v("暂无数据")])])],a("el-dialog",{attrs:{title:"产品基本信息",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("产品名称: "+t._s(t.productInfo.product_name))]),a("span",{staticStyle:{"margin-left":"50px"}},[t._v("产品ID: "+t._s(t.productInfo.ID))]),t._v(" "),a("br"),a("span",[t._v("产品简介: "),a("br"),t._v(t._s(t.productInfo.product_description))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],2)},u=[],l=i("1da1"),d=(i("96cf"),i("ac1f"),i("5319"),i("b680"),i("99af"),i("b775"));function f(t){return Object(d["a"])({url:"/api/spikeActivity/cache",method:"post",data:JSON.stringify({activity_id:t})})}function m(t){return Object(d["a"])({url:"/api/spikeActivity/getCacheSpike",method:"post",data:JSON.stringify({activity_id:t})})}var v={props:{list:{type:Array,default:function(){return[]}}},data:function(){return{activity_status_map:c["c"],dialogVisible:null,productInfo:{product_description:"",product_name:""},lableWidth:"120px",dataWidth:"150px",lineHeight:"40px"}},methods:{showAudit:function(t){this.$notify.error({title:"失败原因",message:t.audit_message})},addActivity:function(){this.$router.replace("/activity/activityAdd")},status:function(t){if(4===t.activity_status){var e=new Date(t.start_time),i=new Date(t.ending_time),a=new Date;return a>e&&a<i?"进行中":"已结束"}return-1===t.audit_status?"审核失败,请查看原因":this.activity_status_map[t.activity_status]},showNumber:function(t){return t>1e8?(t/1e8).toFixed(1)+"亿":t>1e4?(t/1e4).toFixed(1)+"万":t},firstBtnClick:function(t){this.$store.commit("cacheData/SET_CURRENT_ACTIVE",t),this.$router.replace("/activity/viewActiveUsers")},secondBtnClick:function(t){var e=this;this.$confirm("确定删除该活动吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(s["c"])(t.activity_id).then((function(t){e.$message({type:"success",message:"删除成功!"}),e.$parent.getActivityList()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},thirdBtnClick:function(t){this.$store.commit("cacheData/SET_CURRENT_ACTIVE",t),this.$router.replace("/activity/updateActivity")},fourthBtnClick:function(t){t.activity_status>3?this.$message({type:"warning",message:"当前活动不能添加引导信息"}):(this.$store.commit("cacheData/SET_CURRENT_ACTIVE",t),this.$router.replace("/activity/addActivityGuidance"))},fifthBthClick:function(t){var e=this;Object(s["e"])(t.activity_id).then((function(t){e.productInfo=t.product,e.dialogVisible=!0,console.log(t.product)}))},sixthBthClick:function(t){this.$store.commit("cacheData/SET_CURRENT_ACTIVE",t),this.$router.replace("/sift/index")},seventhBthClick:function(t){this.$store.commit("cacheData/SET_CURRENT_ACTIVE",t),this.$router.replace("/activity/viewActivityOrder")},eighthBthClick:function(t){var e=this;m(t.activity_id).then((function(t){0===t.code?(t.data.start_time=e.$IsoToString(t.data.start_time),t.data.ending_time=e.$IsoToString(t.data.ending_time),e.$notify({title:t.data.activity_name,dangerouslyUseHTMLString:!0,message:"\n            <strong>\n              开始时间： ".concat(t.data.start_time,"<br />\n              结束时间： ").concat(t.data.ending_time,"<br />\n              活动ID： ").concat(t.data.activity_id,"<br />\n              产品ID： ").concat(t.data.product_id,"<br />\n              缓存剩余数量： ").concat(t.data.number,"<br />\n              产品总量： ").concat(t.data.product_total,"<br />\n            </strong>\n          ")})):e.$message({type:"warning",message:"暂无缓存数据"})}))},ninthBotClick:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:e.$confirm("确定提前加载缓存？","确定","取消").then((function(){f(t.activity_id).then((function(t){e.$message({type:"success",message:"提前加载缓存成功"})}))}));case 1:case"end":return i.stop()}}),i)})))()}}},p=v,_=(i("82a8"),i("2877")),g=Object(_["a"])(p,o,u,!1,null,"c07404f6",null),h=g.exports,b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{margin:"50px 0 30px 0"}},[i("el-form",{staticStyle:{},attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"活动状态","label-width":"150px"}},[i("el-select",{attrs:{clearable:""},model:{value:t.form.activity_status,callback:function(e){t.$set(t.form,"activity_status",e)},expression:"form.activity_status"}},t._l(t.activity_status_list,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),i("el-form-item",{attrs:{label:"审核状态","label-width":"150px"}},[i("el-select",{attrs:{clearable:""},model:{value:t.form.audit_status,callback:function(e){t.$set(t.form,"audit_status",e)},expression:"form.audit_status"}},t._l(t.activity_audit_status_list,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),i("el-form-item",{attrs:{label:"开始时间","label-width":"150px"}},[i("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"左区间边界","end-placeholder":"右区间边界",align:"right"},model:{value:t.form.start_time,callback:function(e){t.$set(t.form,"start_time",e)},expression:"form.start_time"}})],1),i("el-button",{staticStyle:{background:"rgb(66,185,131)",color:"white","margin-left":"50px"},on:{click:t.submit}},[t._v("查询活动")])],1)],1)},y=[],k=i("bf05"),w={data:function(){return{form:{audit_status:"",activity_status:"",start_time:""},pickerOptions:k["a"],activity_status_list:c["b"],activity_audit_status_list:c["a"]}},methods:{submit:function(){this.$parent.getActivityList()}}},A=w,x=Object(_["a"])(A,b,y,!1,null,"6db7c948",null),C=x.exports,$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-pagination",{ref:"page",attrs:{background:"","hide-on-single-page":!0,layout:"prev, pager, next",total:t.totalPages,"current-page":t.$parent.indexPage},on:{"update:currentPage":function(e){return t.$set(t.$parent,"indexPage",e)},"update:current-page":function(e){return t.$set(t.$parent,"indexPage",e)},"current-change":t.handleCurrentChange}})},O=[],N={props:{totalPages:{type:Number,default:0}},methods:{handleCurrentChange:function(t){this.$emit("pageChange",t)}}},S=N,T=(i("c910"),Object(_["a"])(S,$,O,!1,null,"e8614726",null)),j=T.exports,B={components:{sift:C,pages:j,listCpm:h},data:function(){return{indexPage:1,totalPages:20,page_size:8,list:[],activity_status_list:c["b"]}},mounted:function(){this.getActivityList()},methods:{pageChange:function(t){this.indexPage=t,this.getActivityList()},getActivityList:function(){var t=this,e=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});Object(s["f"])({page:this.indexPage,page_size:this.page_size,activity_status:Number(this.$refs.sift.form.activity_status),audit_status:Number(this.$refs.sift.form.audit_status),start_time:this.$refs.sift.form.start_time&&this.$refs.sift.form.start_time[0]?Object(r["d"])(this.$refs.sift.form.start_time[0]):"",ending_time:this.$refs.sift.form.start_time&&this.$refs.sift.form.start_time[1]?Object(r["d"])(this.$refs.sift.form.start_time[1]):""}).then((function(i){t.list=i.list,t.totalPages=10*Math.ceil(i.total/t.page_size),e.close()}))},lookGoods:function(t){console.log(t)}}},D=B,P=Object(_["a"])(D,a,n,!1,null,"63a8de8c",null);e["default"]=P.exports}}]);