<template>
  <div class="box">
    <el-card :body-style="{ padding: '0px', height: '300px', width: '400px' }">
      <img :src="item.front_cover.host + '/' + item.front_cover.relative_path" class="image">
      <div style="padding: 14px;" class="bottom-top">
        <span>{{ item.article_title }}</span>
        <div class="bottom clearfix">
          <el-popover
            placement="top-end"
            width="180"
            trigger="click"
          >
            <div>
              <div>
                <el-button type="primary" size="small" @click="collect(item.article_id)">查看详情</el-button>
                <el-button type="primary" size="small" @click="update(item.article_id)">更新</el-button>
              </div>
            </div>
            <el-button slot="reference" type="text" class="button">操作按钮</el-button>
          </el-popover>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    collect(item) {
      this.$emit('itemCollectClick', item)
    },
    update(item) {
      this.$emit('itemUpdateClick', item)
    }
  }
}
</script>

<style scoped>
  .box{
    display: inline-block;
    width: 400px;
    height: 300px;
    vertical-align: top;
    margin-left: 90px;
    margin-top: 30px;
  }
  .box img{
    height: 220px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .bottom-top{
    white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
  }
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
