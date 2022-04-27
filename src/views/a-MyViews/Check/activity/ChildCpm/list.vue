<template>
  <div>
    <template v-if="list && list.length > 0">
      <el-card v-for="(item, index) in list" :key="index" class="item" @click.native="itemClick(item)">
        <div class="content">
          <h2 style="overflow:hidden">
            <img src="@/assets/images/money.png" width="24px" height="24px">
            <span>{{ item.activity_name }}</span>
          </h2>
          <span style="font-size: 19.5px;">{{ $IsoToString(item.start_time) }} - {{ $IsoToString(item.ending_time) }}</span>
        </div>
        <div class="bottom">
          <el-button style="background: rgb(66,185,131); color: white;" @click.stop="pass(item)">通过审核</el-button>
          <el-button type="warning" plain @click.stop="refuse(item)">拒绝审核</el-button>
        </div>
      </el-card>
    </template>
    <template v-else>
      <el-card class="item" style="line-height: 200px">
        <span style="margin-left: 140px">暂无数据</span>
      </el-card>
    </template>
    <el-dialog
      title="活动信息"
      :visible.sync="dialogVisible"
      width="30%"
      style="width: 1600px; margin-left: -300px;"
    >
      <span><b>创建人: </b>{{ current.admin_name }}</span>
      <span style="margin-left: 100px;"><b>活动ID: </b> {{ current.activity_id }}</span><br><br>
      <span><b>开始时间: </b>{{ $IsoToString(current.start_time) }}</span>
      <span style="margin-left: 15px;"><b>结束时间: </b> {{ $IsoToString(current.ending_time) }}</span><br><br>
      <span><b>详细信息: </b>{{ current.description }}</span><br><br>
      <span><b>规则介绍: </b>{{ current.roles_introduction }}</span><br><br>
      <span><b>引导信息: </b></span><br><br>
      <img v-for="(item, idx) in current.guidance_information" :key="idx" :src="item" alt="" width="430">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { auditActivity } from '@/api/audit'
// import Vue from 'vue'
import { getActivityGuidance } from '@/api/activity'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      current: {
        activity_id: '',
        admin_name: '',
        description: '',
        start_time: '',
        ending_time: '',
        roles_introduction: '',
        guidance_information: []
      },
      activityID: null
    }
  },
  methods: {
    addActivity() {
      this.$router.push('/activity/activityAdd')
    },
    pass(item) {
      this.activityID = item.activity_id
      this.$confirm('确定通过？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        auditActivity({
          activityID: this.activityID,
          message: '',
          result: 2
        }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.$parent.getActivityList()
        }).catch(_err => {
          this.$message({
            type: 'error',
            message: '操作失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消通过操作'
        })
      })
    },
    refuse(item) {
      this.activityID = item.activity_id
      this.$prompt('请输入理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        auditActivity({
          activityID: this.activityID,
          message: value,
          result: -1
        }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.$parent.getActivityList()
        }).catch(_err => {
          this.$message({
            type: 'error',
            message: '操作失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    itemClick(item) {
      // console.log(item)
      for (const key in this.current) {
        if (key !== 'guidance_information') {
          this.current[key] = item[key]
        }
      }
      getActivityGuidance(item.activity_id).then(res => {
        this.current.guidance_information.splice(0, this.current.guidance_information.length)
        for (const i of res.guidance_information) {
          this.current.guidance_information.push(i.host + '/' + i.relative_path)
        }
        console.log(this.current)
      })
      this.dialogVisible = true
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
