<template>
  <div>
    <el-card class="item add" @click.native="addActivity">
      <span>+ 发布新活动</span>
    </el-card>
    <template v-if="list && list.length > 0">
      <el-card v-for="(item, index) in list" :key="index" class="item">
        <div class="content">
          <span
            class="item-label"
          > {{ status(item) }} </span>
          <h2 style="overflow:hidden">
            <img src="@/assets/images/money.png" width="24px" height="24px">
            <span>{{ item.activity_name }}</span>
          </h2>
          <div style="display: flex; font-size: 20px; margin-bottom: 40px">
            <div style="flex: 1">
              <span
                class="lable-numbers"
              > 关注数: </span>
              {{ showNumber(item.number_of_favorites) }}
            </div>
            <div style="flex: 1">
              <span
                class="lable-numbers"
              > 参与人数: </span>
              {{ showNumber(item.number_of_participants) }}
            </div>
          </div>
          <span style="font-size: 19.5px;">{{ $IsoToString(item.start_time) }} - {{ $IsoToString(item.ending_time) }}</span>
        </div>
        <div class="bottom">
          <el-popover
            placement="top-start"
            width="175"
            trigger="hover"
            style="margin-right: 10px;"
          >
            <div>
              <el-button
                v-show="item.activity_status === 4"
                icon="el-icon-search"
                title="查看活动流量"
                @click="firstBtnClick(item)"
              >查看活动流量</el-button> <br>
              <el-button icon="el-icon-search" title="查看对应商品" @click="fifthBthClick(item)">查看对应商品</el-button> <br>
              <el-button
                v-show="item.activity_status === 4"
                icon="el-icon-search"
                title="查看订单"
                @click="seventhBthClick(item)"
              >查看活动订单</el-button> <br>
              <el-button
                v-show="item.activity_status === 4"
                icon="el-icon-search"
                title="查看库存缓存"
                @click="eighthBthClick(item)"
              >查看库存缓存</el-button> <br>
            </div>
            <el-button slot="reference" icon="el-icon-search" circle title="查看对应信息" />
          </el-popover>
          <el-button
            icon="el-icon-delete"
            circle
            title="删除活动"
            @click="secondBtnClick(item)"
          />
          <el-button
            v-show="item.activity_status <= 3"
            icon="el-icon-edit"
            circle
            title="更新活动细节"
            @click="thirdBtnClick(item)"
          />
          <el-button
            v-show="item.activity_status <= 3"
            icon="el-icon-plus"
            circle
            title="添加/更新引导信息(广告等)"
            @click="fourthBtnClick(item)"
          />
          <el-button
            v-show="item.activity_status <= 3"
            icon="el-icon-setting"
            circle
            title="设置筛选条件"
            @click="sixthBthClick(item)"
          />
          <el-button
            v-show="item.activity_status === 4 && new Date() < new Date(item.ending_time)"
            icon="el-icon-s-promotion"
            circle
            title="提前加载缓存"
            @click="ninthBotClick(item)"
          />
          <el-button
            v-show="item.audit_status === -1"
            icon="el-icon-circle-close"
            circle
            title="查看审核失败原因"
            @click="showAudit(item)"
          />
        </div>
      </el-card>
    </template>
    <template v-else>
      <el-card class="item" style="line-height: 200px">
        <span style="margin-left: 140px">暂无数据</span>
      </el-card>
    </template>
    <el-dialog
      title="产品基本信息"
      :visible.sync="dialogVisible"
    >
      <span>产品名称: {{ productInfo.product_name }}</span>
      <span style="margin-left: 50px">产品ID:  {{ productInfo.ID }}</span> <br>
      <span>产品简介: <br>{{ productInfo.product_description }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { activity_status_map } from '@/mock_data/sift'
import { delActivity, getActivityInfomation } from '@/api/activity'
import { setCache, getCache } from '@/api/redis'
// import request from '@/utils/request'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activity_status_map,
      dialogVisible: null,
      productInfo: { product_description: '', product_name: '' },
      lableWidth: '120px',
      dataWidth: '150px',
      lineHeight: '40px'
    }
  },
  methods: {
    showAudit(item) {
      this.$notify.error({
        title: '失败原因',
        message: item.audit_message
      })
    },
    addActivity() {
      this.$router.replace('/activity/activityAdd')
    },
    status(item) {
      if (item.activity_status === 4) {
        const _1 = new Date(item.start_time)
        const _2 = new Date(item.ending_time)
        const _3 = new Date()
        if (_3 > _1 && _3 < _2) return '进行中'
        else return '已结束'
      }
      if (item.audit_status === -1) return '审核失败,请查看原因'
      return this.activity_status_map[item.activity_status]
    },
    showNumber(num) {
      if (num > 100000000) return (num / 100000000).toFixed(1) + '亿'
      if (num > 10000) return (num / 10000).toFixed(1) + '万'
      return num
    },
    firstBtnClick(item) {
      this.$store.commit('cacheData/SET_CURRENT_ACTIVE', item)
      this.$router.replace('/activity/viewActiveUsers')
    },
    secondBtnClick(item) {
      this.$confirm('确定删除该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delActivity(item.activity_id).then(res => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.$parent.getActivityList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    thirdBtnClick(item) {
      this.$store.commit('cacheData/SET_CURRENT_ACTIVE', item)
      this.$router.replace('/activity/updateActivity')
    },
    fourthBtnClick(item) {
      if (item.activity_status > 3) {
        this.$message({
          type: 'warning',
          message: '当前活动不能添加引导信息'
        })
        return
      }
      this.$store.commit('cacheData/SET_CURRENT_ACTIVE', item)
      this.$router.replace('/activity/addActivityGuidance')
    },
    fifthBthClick(item) {
      getActivityInfomation(item.activity_id).then(res => {
        this.productInfo = res.product
        this.dialogVisible = true
        console.log(res.product)
      })
    },
    sixthBthClick(item) {
      this.$store.commit('cacheData/SET_CURRENT_ACTIVE', item)
      this.$router.replace('/sift/index')
    },
    seventhBthClick(item) {
      this.$store.commit('cacheData/SET_CURRENT_ACTIVE', item)
      this.$router.replace('/activity/viewActivityOrder')
    },
    // 查询库存缓存
    eighthBthClick(item) {
      getCache(item.activity_id).then(res => {
        if (res.code !== 0) {
          this.$message({
            type: 'warning',
            message: '暂无缓存数据'
          })
          return
        }
        res.data.start_time = this.$IsoToString(res.data.start_time)
        res.data.ending_time = this.$IsoToString(res.data.ending_time)
        this.$notify({
          title: res.data.activity_name,
          dangerouslyUseHTMLString: true,
          message: `
            <strong>
              开始时间： ${res.data.start_time}<br />
              结束时间： ${res.data.ending_time}<br />
              活动ID： ${res.data.activity_id}<br />
              产品ID： ${res.data.product_id}<br />
              缓存剩余数量： ${res.data.number}<br />
              产品总量： ${res.data.product_total}<br />
            </strong>
          `
        })
      })
      // axios
    },
    // 提前加载缓存
    async ninthBotClick(item) {
      this.$confirm('确定提前加载缓存？', '确定', '取消').then(() => {
        setCache(item.activity_id).then(res => {
          this.$message({
            type: 'success',
            message: '提前加载缓存成功'
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.item{
  display: inline-block;
  position: relative;
  width: 400px;
  height: 260px;
  margin: 20px 0 20px 40px;
}
.bottom{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  /* background: red; */
  border-top: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
  overflow: hidden;
}
.content{
  width: 100%;
  height: 170px;
}
.item-label{
  position: absolute;
  top: 15px;
  right: 10px;
  color: rgb(66,185,131);
  border-radius: 5px;
}
.add{
  color: rgb(150,150,150);
  text-align: center;
  line-height: 200px;
}
.add:hover{
  cursor:pointer;
}
.lable-numbers{
  flex: 1;
  border-radius: 5px;
  color: white;
  background: rgb(66,185,131);
  border: 2px solid rgb(66,185,131);
}
.firstBtn{
  width: 24px;
  height: 24px;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
