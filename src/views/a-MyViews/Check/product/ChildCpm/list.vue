<template>
  <el-table
    :data="list"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="发布时间">
            <span>{{ IsoToDate(props.row.created_at) }}</span>
          </el-form-item>
          <el-form-item label="产品库存">
            <span>{{ props.row.product_number }}</span>
          </el-form-item>
          <el-form-item label="上一次更新时间">
            <span>{{ IsoToDate(props.row.updated_at) }}</span>
          </el-form-item><el-form-item label="产品单价">
            <span>{{ '￥' + props.row.product_price }}</span>
          </el-form-item>
          <el-form-item label="是否可见">
            <el-switch
              v-model="props.row.is_visible"
              active-color="#13ce66"
              disabled
            />
          </el-form-item>
          <el-form-item label="产品利率">
            <span>{{ props.row.product_interest_rate + '%' }}</span>
          </el-form-item>
          <el-form-item label="利率类型">
            <span>{{ interest_rate_type_options_map[props.row.interest_rate_type] }}</span>
          </el-form-item>
          <el-form-item label="产品权重">
            <span>{{ props.row.weights }}</span>
          </el-form-item>
        </el-form>
        <p><b>产品描述:</b> {{ props.row.product_description }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="ID"
      label="ID"
      width="100"
    />

    <el-table-column
      label="产品名称"
      prop="product_name"
      width="250"
    />

    <el-table-column
      prop="status"
      label="产品状态"
      width="150"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.audit_status === '1' ? 'success' : scope.row.audit_status === '-1' ? 'warning' : 'info'"
        >
          {{ product_status_options_map[scope.row.audit_status] }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="product_tags"
      label="标签"
      width="200"
    >
      <template slot-scope="scope">
        <el-tag
          v-for="item of scope.row.product_tags"
          :key="item.ID"
          type="success"
        >
          {{ item.tag_name }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="weights"
      label="权重"
      width="100"
    />

    <el-table-column
      align="right"
      min-width="250"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          @click="handleUpdate(scope.$index, scope.row)"
        >通过</el-button>
        <el-button
          type="danger"
          @click="handleDel(scope.$index, scope.row)"
        >打回</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  product_status_options_map,
  product_type_options,
  interest_rate_type_options_map
} from '@/mock_data/sift'
import {
  auditProduct
} from '@/api/audit'
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
      product_status_options_map,
      product_type_options,
      interest_rate_type_options_map
    }
  },
  methods: {
    IsoToDate(iso) {
      return this.$IsoToString(iso)
    },
    getStatus(status) {
      if (status === 1) return '未审核'
      if (status === 2) return '审核通过'
      return '审核失败'
    },
    handleDel(_index, row) {
      this.$prompt('请输入理由').then(({ value }) => {
        auditProduct({ productID: row.ID, message: value, result: -1 }).then(res => {
          this.$parent.getProductList()
        })
      }).catch(() => {})
    },
    handleUpdate(_index, row) {
      this.$confirm('确定通过？').then(() => {
        auditProduct({ productID: row.ID, message: '', result: 2 }).then(res => {
          this.$parent.getProductList()
        })
      }).catch(() => {})
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
