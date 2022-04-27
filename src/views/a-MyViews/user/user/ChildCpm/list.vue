<template>
  <div>
    <template v-if="list && list.length > 0">
      <el-card v-for="(item, index) in list" :key="index" class="item">
        <div class="content">
          <span class="item-label"> {{ user_status_map[item.status] }}ing... </span>
          <h4 style="overflow:hidden">
            <img :src="item.profile_picture_url" width="60px" height="60px" alt="" align="top">
            <span style="margin-left: 20px;">
              {{ item.nick_name || '用户暂未设置昵称' }}
            </span>
            <span style="position: absolute; top: 80px; left: 105px;">
              {{ item.phone_number }}
            </span>
          </h4>
          <div style="display: flex; font-size: 20px; margin-bottom: 10px">
            <div style="flex: 0.6">
              <span
                class="lable-numbers"
              > 性别: {{ user_gender_map[item.gender] }} </span>
            </div>
            <div style="flex: 0.6">
              <span
                class="lable-numbers"
              > 年龄: {{ item.age }} </span>
            </div>
            <div style="flex: 1">
              <span> 职业: {{ item.occupation || '未知' }}</span>
            </div>
          </div>
          <span
            class="lable-numbers"
          > 上一次登录时间: {{ $IsoToString(item.login_time) }} </span>
        </div>
        <div class="bottom">
          <el-button
            style="background: rgb(66,185,131); color: white"
            @click="handleEdit(item)"
          >
            编辑
          </el-button>
        </div>
      </el-card>
    </template>
    <template v-else>
      <el-card class="item" style="line-height: 200px">
        <span style="margin-left: 140px">暂无数据</span>
      </el-card>
    </template>
  </div>
</template>

<script>
import {
  user_status_map,
  user_gender_map
} from '@/mock_data/sift'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      user_status_map,
      user_gender_map
    }
  },
  methods: {
    handleEdit(item) {
      this.$emit('handleEdit', item)
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
}
.content{
  width: 100%;
  height: 170px;
}
.item-label{
  position: absolute;
  top: 15px;
  right: 10px;
  /* color: white; */
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
  /* background: rgb();
  border: 3px solid ; */
}
</style>
