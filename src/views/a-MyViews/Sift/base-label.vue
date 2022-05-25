<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" circle @click="labelClick" />
  </div>
</template>

<script>
export default {
  name: 'BaseLabel',
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  created() {
    // console.log(this.itemData);
  },
  methods: {
    labelClick(e) {
      console.log('labelClick')
      this.$emit('dblclick', 'emitlabelClick')
    }
  }
}
</script>
