<template>
  <div>
    <sift @submit="submit" />
    <product-list-cpm
      :list="showList"
      @delete="deleteProduct"
      @update="updateProduct"
    />
    <page
      :total-pages="totalPages * 10"
      :index-page="indexPage"
      @pageChange="pageChange"
    />
    <update
      ref="update"
      :current-product="currentProduct"
      @submit="updateSubmit"
    />
  </div>
</template>

<script>
// 子组件
import productListCpm from './ChildCpm/list'
import page from './ChildCpm/pages'
import sift from './ChildCpm/sift'
import update from './ChildCpm/update'
import {
  getProductList,
  deleteProduct,
  updateProduct
} from '@/api/product'

// import
export default {
  components: {
    sift,
    page,
    update,
    productListCpm
  },
  data() {
    return {
      indexPage: 1,
      totalPages: 20,
      showList: [],
      currentProduct: {},
      form: {
        interest_rate_type: '',
        page: 0,
        pageSize: 20, // 禁止修改
        product_name: '',
        audit_status: 1
      }
    }
  },
  created() {
    this.form.page = this.$store.getters.getProductPage
    this.getProductList(this.form)
  },
  beforeDestroy() {
    this.$store.commit('cacheData/SET_PRODUCT_PAGE', this.form.page)
  },
  methods: {
    submit() {
      this.form.interest_rate_type = Number(this.form.interest_rate_type)
      console.log(this.form)
      this.getProductList()
    },
    pageChange(page) { // 页码改变
      this.form.page = page
      this.getProductList()
    },
    getProductList() {
      getProductList(this.form).then(res => {
        this.totalPages = Math.ceil(res.Total / this.form.pageSize)
        const { List } = res
        this.showList.splice(0, this.showList.length, ...List)
      })
    },
    deleteProduct(row) {
      deleteProduct(row.ID).then(res => {
        this.$message.success('删除成功')
        this.getProductList()
      })
    },
    updateProduct(row) {
      // console.log(row)
      this.currentProduct = row
      this.$refs.update.dialogVisible = true
    },
    updateSubmit(form) {
      updateProduct(form).then(res => {
        this.$message.success('修改成功')
        this.$refs.update.dialogVisible = false
        this.getProductList()
      })
    }
  }
}
</script>

<style scoped>

</style>
