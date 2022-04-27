<template>
  <el-dialog
    v-if="dialogVisible"
    title="更新产品"
    :visible.sync="dialogVisible"
    style="width: 1500px"
    :before-close="handleCloseDialog"
  >
    <table class="table-box" style="margin-left: 50px" border="0">
      <!-- 产品ID 产品利率类型： -->
      <tr :height="lineHeight">
        <td :width="lableWidth">产品ID</td>
        <td :width="dataWidth" style="padding-left: 15px;">{{ productInfo.ID }}</td>
        <td :width="lableWidth">产品利率类型：</td>
        <td :width="dataWidth">
          <el-select v-model="productInfo.interest_rate_type" placeholder="利率类型">
            <el-option
              v-for="item of interest_rate_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <!-- 产品名称 产品单笔价格-->
      <tr :height="lineHeight">
        <td :width="lableWidth">产品名称: </td>
        <td :width="dataWidth">
          <el-input
            v-model="productInfo.product_name"
            placeholder="请输入产品名称"
            class="inputs"
          />
        </td>
        <td :width="lableWidth">产品单笔价格</td>
        <td :width="dataWidth">
          <el-input
            v-model="productInfo.product_price"
            type="number"
            class="inputs"
          />
        </td>
      </tr>
      <!-- 产品数量 产品利率(%)-->
      <tr :height="lineHeight">
        <td :width="lableWidth">产品数量</td>
        <td :width="dataWidth">
          <el-input
            v-model="productInfo.product_number"
            type="number"
            class="inputs"
          />
        </td>
        <td :width="lableWidth">产品利率(%)</td>
        <td :width="dataWidth">
          <el-input
            v-model="productInfo.product_interest_rate"
            type="number"
            class="inputs"
          />
        </td>
      </tr>
      <!-- 最小持有时间 -->
      <tr :height="lineHeight">
        <td :width="lableWidth">最小持有时间</td>
        <td :width="dataWidth">
          <el-input
            v-model="productInfo.min_hold_time.year"
            type="number"
            style="width: 130px"
          />
          <span>年</span>
        </td>
        <td>
          <el-select
            v-model="productInfo.min_hold_time.month"
            placeholder="请选择"
            style="width: 90px"
          >
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item - 1"
              :value="item - 1"
            />
          </el-select>
          <span>月</span>
        </td>
        <td>
          <el-select
            v-model="productInfo.min_hold_time.day"
            placeholder="请选择"
            style="width: 130px"
          >
            <el-option
              v-for="item in 32"
              :key="item"
              :label="item - 1"
              :value="item - 1"
            />
          </el-select>
          <span>日</span>
        </td>
      </tr>
      <!-- 产品标签 -->
      <tr height="120">
        <td :width="lableWidth">产品标签</td>
        <td>
          <el-select
            v-model="currentTag"
            multiple
            filterable
            allow-create
            default-first-option
            value-key="tag_id"
            placeholder="请选择/输入标签"
            style="width: 87%"
          >
            <el-option
              v-for="item in tagList"
              :key="item.tag_id"
              :label="item.tag_name"
              :value="item"
            />
          </el-select>
        </td>
        <td colspan="2" style="text-align: left;">
          <el-tag
            v-for="(tag, idx) in productInfo.product_tags"
            :key="idx"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.tag_name }}
          </el-tag>
        </td>
      </tr>
      <!-- 产品描述 -->
      <tr :height="lineHeight">
        <td :width="lableWidth">产品描述</td>
        <td colspan="3">
          <el-input
            v-model="productInfo.product_description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 100}"
            placeholder="请输入内容"
          />
        </td>
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  interest_rate_type_options
} from '@/mock_data/sift'
import { getProductTagList } from '@/api/product'
export default {
  props: {
    currentProduct: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      lableWidth: '120px',
      dataWidth: '150px',
      lineHeight: '40px',
      interest_rate_type_options,
      productInfo: this.currentProduct,
      inputVisible: false,
      inputValue: '',
      tagList: [],
      currentTag: []
    }
  },
  watch: {
    dialogVisible(n, _o) {
      if (n) {
        // 赋值过来，直接赋值的话属于是使用同一块地址
        this.productInfo = JSON.parse(JSON.stringify(this.currentProduct))
        // 处理标签
        for (let i = 0; i < this.productInfo.product_tags.length; i++) {
          this.productInfo.product_tags[i] = {
            tag_id: this.productInfo.product_tags[i].ID,
            tag_name: this.productInfo.product_tags[i].tag_name
          }
        }
        // 处理时间
        this.productInfo.min_hold_time = {
          year: parseInt(this.productInfo.min_hold_time.substr(0, 4)),
          month: parseInt(this.productInfo.min_hold_time.substr(5, 2)),
          day: parseInt(this.productInfo.min_hold_time.substr(8, 2))
        }

        getProductTagList().then(res => {
          this.tagList = res.List.map(item => {
            return {
              tag_id: item.ID,
              tag_name: item.tag_name
            }
          })
        })
      }
    },
    currentTag(n, o) {
      if (typeof n[0] === 'string') { // 如果是直接输入的
        for (const item of this.productInfo.product_tags) {
          console.log(item.tag_name, n[0])
          if (item.tag_name === n[0]) {
            this.currentTag = []
            this.$message('标签已存在')
            return
          }
        }
        this.productInfo.product_tags.push({
          tag_id: 0,
          tag_name: n[0]
        })
        this.currentTag = []
      } else if (n.length === 1 && o.length === 0) {
        for (const item of this.productInfo.product_tags) {
          if (item.tag_name === n[0].tag_name) {
            this.currentTag = []
            this.$message('标签已存在')
            return
          }
        }
        this.productInfo.product_tags.push({
          tag_id: n[0].tag_id,
          tag_name: n[0].tag_name
        })
        this.currentTag = []
      }
    }
  },
  methods: {
    submit() {
      this.$confirm('确定修改产品信息？').then(_ => {
        this.$emit('submit', this.productInfo)
      }).catch(_ => {})
    },
    handleClose(tag) {
      this.productInfo.product_tags.splice(this.productInfo.product_tags.indexOf(tag), 1)
    },
    handleCloseDialog(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          if (typeof done === 'function') done()
          this.dialogVisible = false
        })
        .catch(_ => {})
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) this.productInfo.product_tags.push({ tag_id: 0, tag_name: inputValue }) // 动态添加标签
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .table-box >>> *:not(.no-inputs) .el-input__inner{
    color: #868686;
    border-bottom: 1px solid #DCDFE6;
    border-left: 0 solid rgb(225,243,253);
    border-top: 0 solid rgb(225,243,253);
    border-right: 0 solid rgb(225,243,253);
    padding: 0 solid rgb(225,243,253);
  }
</style>
