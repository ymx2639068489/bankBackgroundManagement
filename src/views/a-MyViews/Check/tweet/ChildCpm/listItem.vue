<template>
  <div class="box">
    <el-card :body-style="{ padding: '0px', height: '300px', width: '400px' }">
      <img
        :src="item.front_cover.host + '/' + item.front_cover.relative_path"
        class="image"
        @click.native="$router.push('/tweet/showMore/' + item.article_id)"
      >
      <div style="padding: 14px;" class="bottom-top">
        <span>{{ item.article_title }}</span>
        <div class="bottom clearfix">
          <el-popover
            placement="top-end"
            width="200"
            trigger="click"
          >
            <div>
              <el-popover
                v-model="visible1"
                placement="top"
                width="180"
              >
                <p>请输入拒绝理由吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-input v-model="message" type="text" />
                  <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="collect(item.article_id)">确定</el-button>
                </div>
                <el-button slot="reference">拒绝</el-button>
              </el-popover>
              <el-popover
                v-model="visible2"
                placement="top"
                width="180"
                style="margin-left: 20px;"
              >
                <p>确定通过吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="update(item.article_id)">确定</el-button>
                </div>
                <el-button slot="reference">通过</el-button>
              </el-popover>

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
  data() {
    return {
      visible1: false,
      visible2: false,
      message: ''
    }
  },
  methods: {
    collect(item) {
      this.$emit('itemCollectClick', item, this.message)
      this.visible1 = false
    },
    update(item) {
      this.$emit('itemUpdateClick', item)
      this.visible2 = false
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
