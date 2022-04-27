<template>
  <div>
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <div class="board-column" :style="styleObject">
      <draggable
        :list="list"
        v-bind="$attrs"
        animation="600"
        class="board-column-content"
        :scroll="isScroll"
        :set-data="setData"
      >
        <div v-for="element in list" :key="element.ID" class="board-item" @click="itemClick(element)">
          <img
            :src="element.url"
            alt="error"
            :title="element.title && element.description ? '标题: ' + element.title + '\n描述: ' + element.description : ''"
          >
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    styleObject: {
      type: Object,
      default() {
        return {}
      }
    },
    isScroll: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    itemClick(e) {
      this.$emit('itemClick', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.board-column-header {
  position: sticky;
  top: 0;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  background: #333;
  color: #fff;
  border-radius: 3px 3px 0 0;
}
.board-column {
  min-width: 300px;
  min-height: 100px;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 300px;
    .board-item {
      cursor: pointer;
      width: 300px;
      height: 200px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      img{
        width: 300px;
        height: 200px;
      }
    }
  }
}
</style>

