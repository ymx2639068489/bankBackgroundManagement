<template>
  <el-table
    :data="list"
  >
    <el-table-column
      label="订单ID"
      prop="ID"
      width="80"
    />
    <el-table-column
      label="用户"
      width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.real_name }}
      </template>
    </el-table-column>

    <el-table-column
      label="用户ID"
      prop="user_id"
      width="80"
    />

    <el-table-column
      label="订单状态"
      width="300"
    >
      <template slot-scope="scope">
        <el-tag
          :type="
            scope.row.order_status === 2 ? 'success' :
            scope.row.audit_status === -1 ? 'warning' : 'info'"
        >
          {{ order_status_map[scope.row.order_status] }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      label="订单状态"
      width="300"
    >
      <template slot-scope="scope">
        <el-tag
          :type="
            scope.row.payment_status === 2 ? 'success' :
            scope.row.payment_status === -1 ? 'warning' : 'info'"
        >
          {{ payment_status_map[scope.row.order_status] }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  payment_status_map,
  order_status_map
} from '@/mock_data/sift'
export default {
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
      payment_status_map,
      order_status_map
    }
  },
  methods: {
    IsoToDate(iso) {
      return this.$IsoToString(iso)
    }
  }
}
</script>

<style scoped>
.tag-item{
  display: inline-block;
  margin: 10px 5px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
