<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <template>
        <i class="el-icon-edit-outline" />
        <span>发布产品</span>
      </template>
      <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">返  回</el-button>
    </div>
    <table class="table-box" border="0">
      <!-- 产品名称 -->
      <tr :height="lineHeight">
        <td :width="lableWidth">
          <span class="label_back">产品名称</span>
        </td>
        <td :width="dataWidth" colspan="3">
          <el-input
            v-model="form.product_name"
            placeholder="请输入产品名称"
            class="inputs"
            style="width: 95%"
          />
        </td>
      </tr>
      <!-- 产品利率类型： 产品单笔价格-->
      <tr :height="lineHeight">
        <td :width="lableWidth"> <span class="label_back">利率类型</span></td>
        <td :width="dataWidth">
          <el-select v-model="form.interest_rate_type" placeholder="利率类型" style="width: 87%">
            <el-option
              v-for="item of interest_rate_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
        <td :width="lableWidth"> <span class="label_back">单笔价格</span></td>
        <td :width="dataWidth">
          <el-input
            v-model="form.product_price"
            type="number"
            class="inputs"
            style="width: 87%"
            min="0"
          />
        </td>
      </tr>
      <!-- 产品数量 产品利率(%)-->
      <tr :height="lineHeight">
        <td :width="lableWidth"> <span class="label_back">产品数量</span></td>
        <td :width="dataWidth">
          <el-input
            v-model="form.product_number"
            type="number"
            class="inputs"
            style="width: 87%"
            min="1"
            max="2000000000"
          />
        </td>
        <td :width="lableWidth"> <span class="label_back">产品利率(%)</span></td>
        <td :width="dataWidth">
          <el-input
            v-model="form.product_interest_rate"
            type="number"
            class="inputs"
            style="width: 87%"
          />
        </td>
      </tr>
      <!-- 产品标签 -->
      <tr :height="lineHeight">
        <td :width="lableWidth"> <span class="label_back">产品标签</span></td>
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
            v-for="(tag, idx) in form.product_tags"
            :key="idx"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.tag_name }}
          </el-tag>
        </td>
      </tr>
      <!-- 最小持有时间 -->
      <tr :height="lineHeight">
        <td :width="lableWidth + 30"> <span class="label_back">最小持有时间(年/月/日)</span></td>
        <td :width="dataWidth" colspan="3">
          <el-input
            v-model="form.min_hold_time.year"
            type="number"
            style="width: 195px;"
            min="0"
          />
          <el-select
            v-model="form.min_hold_time.month"
            placeholder="请选择"
            style="width: 180px; margin-left: 5%"
          >
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item - 1"
              :value="item - 1"
            />
          </el-select>
          <el-select
            v-model="form.min_hold_time.day"
            placeholder="请选择"
            style="width: 180px; margin-left: 5%"
          >
            <el-option
              v-for="item in 32"
              :key="item"
              :label="item - 1"
              :value="item - 1"
            />
          </el-select>
        </td>
      </tr>
      <!-- 产品描述 -->
      <tr :height="lineHeight">
        <td :width="lableWidth"> <span class="label_back">产品描述</span></td>
        <td colspan="3">
          <el-input
            v-model="form.product_description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 100}"
            placeholder="请输入内容"
            style="width: 95%"
          />
        </td>
      </tr>
    </table>
    <div class="bottom-btn">
      <el-button
        style="background: rgb(66,185,131); color: white"
        round
        @click="sureSubmit"
      >已 确 定 产 品 信 息 正 确 并 提 交</el-button>
    </div>
  </el-card>
</template>

<script>
import {
  product_status_options,
  product_type_options,
  interest_rate_type_options
} from '@/mock_data/sift'
import { getProductTagList, addProduct } from '@/api/product'
export default {
  data() {
    return {
      form: {
        min_hold_time: { year: 0, month: 0, day: 0 },
        interest_rate_type: '',
        product_description: '',
        product_interest_rate: '',
        product_name: '',
        product_number: '100000',
        product_price: '10000',
        product_tags: []
      },
      lableWidth: 80,
      dataWidth: 150,
      lineHeight: 80,
      product_status_options,
      product_type_options,
      interest_rate_type_options,
      currentTag: [],
      tagList: []
    }
  },
  watch: {
    currentTag(n, o) {
      if (typeof n[0] === 'string') { // 如果是直接输入的
        for (const item of this.form.product_tags) {
          console.log(item.tag_name, n[0])
          if (item.tag_name === n[0]) {
            this.currentTag = []
            this.$message('标签已存在')
            return
          }
        }
        this.form.product_tags.push({
          tag_id: 0,
          tag_name: n[0]
        })
        this.currentTag = []
      } else if (n.length === 1 && o.length === 0) {
        for (const item of this.form.product_tags) {
          if (item.tag_name === n[0].tag_name) {
            this.currentTag = []
            this.$message('标签已存在')
            return
          }
        }
        this.form.product_tags.push({
          tag_id: n[0].tag_id,
          tag_name: n[0].tag_name
        })
        this.currentTag = []
      }
    }
  },
  created() {
    getProductTagList().then(res => {
      this.tagList = res.List.map(item => {
        return {
          tag_id: item.ID,
          tag_name: item.tag_name
        }
      })
    })
  },
  methods: {
    handleClose(tag) {
      this.form.product_tags.splice(this.form.product_tags.indexOf(tag), 1)
    },
    sureSubmit() {
      if (this.form.product_name === '') {
        this.$message('请输入产品名称')
        return
      }
      if (this.form.product_price === '') {
        this.$message('请输入产品价格')
        return
      }
      if (this.form.product_number === '') {
        this.$message('请输入产品数量')
        return
      }
      if (this.form.product_interest_rate === '') {
        this.$message('请输入产品利率')
        return
      }
      addProduct(this.form).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.back()
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1020px;
    margin: 10vh auto;
    position: relative;
  }
  .table-box{
    width: 850px;
    text-align: center;
  }
  .bottom-btn{
    text-align: center;
    margin-top: 20px;
  }
  .label_back{
    background-color: rgb(66,185,131);
    border: 10px solid rgb(66,185,131);
    border-radius: 15px;
    color: white;
  }
</style>
