<template>
  <div class="base-node">
    <div class="center">{{ itemData.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseNode',
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    canvasNode: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  created() {
    // console.log(this.itemData)
    // console.log(this.canvasNode);
  },
  methods: {
    click(e) {
      console.log('click')
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
  .base-node {
    width: 190px;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 10px;
    box-shadow: 3px 4px 16px #888888;
  }
  .base-node .center {
    text-align: center;
  }
</style>
