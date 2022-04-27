<template>
  <el-table
    :data="list"
    max-height="800"
    border
    stripe
  >
    <el-table-column
      label="活动标题"
      prop="Title"
      width="180"
      fixed
    />

    <el-table-column
      label="创建人"
      width="120"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          plain
          @click="userDetailClick(scope.$index, scope.row)"
        >{{ scope.row.Username }}</el-button>
      </template>
    </el-table-column>

    <el-table-column
      label="开始时间"
      prop="TimeStart"
      width="150"
    />

    <el-table-column
      label="结束时间"
      prop="TimeEnd"
      width="150"
    />

    <el-table-column
      label="海报"
      width="180"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.PosterUrl ? 'success' : 'info'">
          <a v-if="scope.row.PosterUrl" :href="'http://114.132.236.147/gxa' + scope.row.PosterUrl" target="_blank">
            点击查看活动海报
          </a>
          <span v-else>当前活动没有上传海报</span>
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      min-width="300"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-input
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
            style="width: 300px;"
          >
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-circle-close"
              @click="search = ''"
            />
          </el-input>
        </div>
        <!-- 由于使用了ESlint，没有使用scope 导致报错，下面的div只为了不让这个错误报错 -->
        <div v-if="false">{{ scope }}</div>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          @click="viewDetailClick(scope.$index, scope.row)"
        >查看详细策划书</el-button>
        <el-button
          size="mini"
          type="success"
          @click="showDetailClick(scope.$index, scope.row)"
        >查看每日流量</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {

  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      search: '' // 过滤器的值
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  methods: {
    userDetailClick(_index, row) {
      this.$notify.success({
        title: '用户信息',
        dangerouslyUseHTMLString: true,
        message: '<p>用户名: ' + row.Username + '</p> email : ' + row.Email + '</p>'
      })
    },
    viewDetailClick(_index, row) {
      this.$emit('viewDetailClick', row) // 查看详情
    },
    showDetailClick(_index, row) {
      this.$emit('showDetailClick', row) // 查看详情
    }
  }
}
</script>

<style scoped>

</style>
