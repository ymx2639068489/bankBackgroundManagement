<template>
  <div class="base-node">
    <div class="center">
      <i
        class="el-icon-error"
        style="position: absolute; top: 5px; right: 10px"
        @click="deleteItem"
      />
      {{ itemData.field_name }}
    </div>
    <div class="center">
      <span v-show="!isShow" class="condition-text">
        {{ condition }}
        <i class="el-icon-edit" @click="isShow = !isShow" />
      </span>
      <el-input
        v-show="isShow"
        v-model="condition"
        type="text"
        @keydown.native.enter="surehandler"
        @keyup.native.enter="surehandler"
      />
    </div>
  </div>
</template>

<script>
import { modifyCondition } from './data'
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
  data() {
    return {
      isShow: false,
      condition: this.itemData.condition
    }
  },
  created() {
  },
  methods: {
    click(e) {
      e.stopPropagation()
    },
    deleteItem() {
      this.$emit('deleteItem', this.itemData.id)
    },
    surehandler() {
      this.isShow = false
      this.condition = this.condition.trim()
      modifyCondition(this.itemData.id, this.condition)
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
  .condition-text{
    /* // 下划线/ */
    text-decoration: underline;
  }
</style>
