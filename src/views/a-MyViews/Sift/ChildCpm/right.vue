<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="-1"
      >

        <el-menu-item
          index="-1"
          @click.native="is_click_current = false"
        >{{ '从已有规则中选' }}
        </el-menu-item>

        <el-menu-item
          v-for="(item, idx) in tableList"
          :key="idx"
          :index="String(idx)"
          @click.native="handleClick(item)"
        >{{ item.table_name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <el-table v-show="is_click_current" :data="current.table_field">
          <el-table-column label="字段" width="140">
            <template slot-scope="scoped">
              {{ scoped.row }}
            </template>
          </el-table-column>
          <el-table-column
            align="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
              >select</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="!is_click_current" :data="filterList">
          <el-table-column
            label="描述"
            prop="description"
            width="140"
          />
          <el-table-column
            label="表"
            width="140"
          >
            <template slot-scope="scope">
              {{ tableList.find(item => item.id === scope.row.filter_table_id) ? tableList.find(item => item.id === scope.row.filter_table_id).table_name : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="字段"
            prop="filed_name"
            width="140"
          />
          <el-table-column
            label="范围"
            prop="value_range"
            width="140"
          />
          <el-table-column
            align="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSelect(scope.row)"
              >select</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog :title="'新增规则' + current.field_name" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="描述信息" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="拒绝后信息" :label-width="formLabelWidth">
          <el-input v-model="form.error_tips" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选值范围" :label-width="formLabelWidth">
          <el-input v-model="form.value_range_left" autocomplete="off" style="width: 40%; margin-right: 8%" />
          -
          <el-input v-model="form.value_range_right" autocomplete="off" style="width: 40%; margin-left: 8%" />
        </el-form-item>
        <p>若当前字段为文字则只用填写任意一个空即可，若为数值则填写一个区间范围</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getTbaleName,
  getFieldList,
  getFilterList,
  setValueRange
} from '@/api/sift'
export default {
  props: {
    currentFilterList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableList: [],
      current: { field_name: '', table_field: [] },
      filterList: [],
      is_click_current: false,
      dialogFormVisible: false,
      form: {
        description: '',
        value_range_left: '',
        value_range_right: '',
        error_tips: ''
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    dialogFormVisible(n, o) {
      if (o) {
        this.form.description = ''
        this.form.value_range_left = ''
        this.form.value_range_right = ''
      }
    }
  },
  created() {
    this.getFilterList()
    this.getTbaleName()
  },
  methods: {
    getFilterList() {
      getFilterList().then(res => {
        // 去重
        for (const i of res.List) {
          let f = true
          for (const j of this.filterList) {
            if (i.field_name === j.field_name &&
                i.value_range === j.value_range
            ) f = false
          }
          if (f) this.filterList.push(i)
        }
      })
    },
    getTbaleName() {
      getTbaleName().then(res => {
        for (let i = 0; i < res.length; i++) {
          this.tableList.push({
            id: res[i].id,
            table_name: res[i].table_name,
            table_field: []
          })
          getFieldList(res[i].table_name).then(res => {
            for (const key in res) {
              this.tableList[i].table_field.push(res[key])
            }
          })
        }
      })
    },
    handleClick(item) {
      this.is_click_current = true
      this.current = item
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.current.field_name = row
    },
    handleSelect(row) {
      const _this = this
      for (const i of this.currentFilterList) {
        if (i.filter_table_id === row.filter_table_id &&
            i.field_name === row.field_name &&
            i.value_range === row.value_range
        ) {
          this.$message({ type: 'warning', message: '已存在' })
          return
        }
      }
      setValueRange({
        activity_id: this.$store.getters.getCurrentActive.activity_id,
        description: row.description,
        field_name: row.filed_name,
        filter_table_id: row.filter_table_id,
        value_range: row.value_range
      }).then(res => {
        this.$message({ type: 'success', message: res })
        _this.$emit('addItem')
        _this.dialogFormVisible = false
      })
    },
    submit() {
      const _this = this
      const { description, value_range_left, value_range_right, error_tips } = this.form
      if (description === '' || (value_range_left === '' && value_range_right === '') || error_tips === '') {
        this.$message({ type: 'warning', message: '请填写完整信息' })
        return
      }
      // 如果其中一个不是
      if (Number.isNaN(Number(value_range_left)) || Number.isNaN(Number(value_range_right))) {
        let s = value_range_left || value_range_right
        s = "'" + s + "'"
        const _1 = {
          activity_id: this.$store.getters.getCurrentActive.activity_id,
          description: this.form.description,
          field_name: this.current.field_name,
          filter_table_id: this.current.id,
          error_tips,
          value_range: '=' + s
        }
        setValueRange(_1).then(res => {
          _this.$message({ type: 'success', message: res })
          _this.$emit('addItem')
          _this.getFilterList()
          _this.dialogFormVisible = false
        })
        return
      } else {
        // 单点添加
        if (value_range_left === value_range_right) {
          const _1 = {
            activity_id: this.$store.getters.getCurrentActive.activity_id,
            description: this.form.description,
            field_name: this.current.field_name,
            filter_table_id: this.current.id,
            error_tips,
            value_range: '=' + value_range_left
          }
          setValueRange(_1).then(res => {
            _this.$message({ type: 'success', message: res })
            _this.$emit('addItem')
            _this.getFilterList()
            _this.dialogFormVisible = false
          })
          return
        }
        // 半区间增加
        if (!value_range_left) {
          // 左区间为空，只设置右区间即可
          const _1 = {
            activity_id: this.$store.getters.getCurrentActive.activity_id,
            description: this.form.description,
            field_name: this.current.field_name,
            filter_table_id: this.current.id,
            error_tips,
            value_range: '<=' + value_range_right
          }
          setValueRange(_1).then(res => {
            _this.$message({ type: 'success', message: res })
            _this.$emit('addItem')
            _this.getFilterList()
            _this.dialogFormVisible = false
          })
          return
        }
        if (!value_range_right) {
          // 右区间为空，只设置左区间即可
          const _1 = {
            activity_id: this.$store.getters.getCurrentActive.activity_id,
            description: this.form.description,
            field_name: this.current.field_name,
            filter_table_id: this.current.id,
            error_tips,
            value_range: '>=' + value_range_left
          }
          setValueRange(_1).then(res => {
            _this.$message({ type: 'success', message: res })
            _this.$emit('addItem')
            _this.getFilterList()
            _this.dialogFormVisible = false
          })
          return
        }
        // 全区间修改
        const _1 = {
          activity_id: this.$store.getters.getCurrentActive.activity_id,
          description: this.form.description,
          field_name: this.current.field_name,
          filter_table_id: this.current.id,
          error_tips,
          value_range: '>=' + value_range_left
        }
        setValueRange(_1).then(() => {
          _1.value_range = '<=' + value_range_right
          setValueRange(_1).then(res => {
            _this.$message({ type: 'success', message: res })
            _this.$emit('addItem')
            _this.getFilterList()
            _this.dialogFormVisible = false
          })
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-container >>> .el-aside {
    color: #333;
    height: calc(100vh - 253px) !important;
    background: #545c64 !important;
  }
</style>
