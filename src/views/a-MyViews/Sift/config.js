
import baseEdge from './base-label.vue'
export default {
  zoomable: true,
  moveable: true,
  draggable: true,
  global: {
    isScopeStrict: true,
    edge: {
      type: 'endpoint',
      label: '请输入条件', // 线条默认label
      arrowPosition: 0.5, // 箭头位置(0 ~ 1)
      arrowOffset: 0.0, // 箭头偏移
      arrowShapeType: '', // 自定义箭头样式
      isExpandWidth: false, // 增加线条交互区域
      defaultAnimate: false, // 默认开启线条动画
      render: baseEdge
    }
  },
  layout: {
    type: 'compactBox',
    options: {
      direction: 'TB', // H / V / LR / RL / TB / BT
      getHeight(d) {
        return 60
      },
      getWidth(d) {
        return 120
      },
      getHGap(d) {
        return 20
      },
      getVGap(d) {
        return 80
      }
    }
  },
  theme: {
    edge: {
      type: 'endpoint',
      label: '请输入条件', // 线条默认label
      arrowPosition: 0.5, // 箭头位置(0 ~ 1)
      arrowOffset: 0.0, // 箭头偏移
      arrowShapeType: '', // 自定义箭头样式
      isExpandWidth: false, // 增加线条交互区域
      defaultAnimate: false // 默认开启线条动画
    }
  }
}
