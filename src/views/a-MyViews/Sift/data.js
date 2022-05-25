
const endpoints = [
  {
    id: 'bottom',
    orientation: [0, 1],
    pos: [0.5, 0]
  },
  {
    id: 'top',
    orientation: [0, -1],
    pos: [0.5, 0]
  }
]
import baseNode from './base-node.vue'
import rootNode from './root-node.vue'
// import leafNode from './leaf-node.vue'
export const mockData = {
  nodes: [],
  edges: []
}

export function initData() {
  mockData.nodes.splice(0, mockData.nodes.length)
  mockData.edges.splice(0, mockData.edges.length)
}

export function addNode({ table_name, field_name, top, left, condition = '' }) {
  const _1 = {
    id: '' + (mockData.nodes.length + 1),
    width: 100,
    height: 30,
    draggable: true,
    shape: 'rect',
    top,
    left,
    render: baseNode,
    field_name,
    table_name,
    condition,
    endpoints
  }
  mockData.nodes.push(_1)
}

export function addRootNode({ field_name, table_name, condition, top, left }) {
  if (!top) top = 100
  if (!left) left = 500
  mockData.nodes.push({
    id: '1',
    width: 100,
    height: 30,
    draggable: true,
    shape: 'rect',
    top,
    left,
    render: rootNode,
    field_name,
    table_name,
    title: `${field_name}${condition}(正常用户)`,
    endpoints: [{
      id: 'bottom',
      orientation: [0, 1],
      pos: [0.5, 0]
    }],
    condition
  })
}

export function addEdge({ source_node_id, target_node_id }) {
  mockData.edges.push({
    id: '' + (mockData.edges.length + 1),
    source: 'bottom',
    target: 'top',
    sourceNode: source_node_id,
    targetNode: target_node_id
  })
}

export function delNode(id) {
  for (let i = 0; i < mockData.nodes.length; i++) {
    if (mockData.nodes[i].id === id) {
      mockData.nodes.splice(i, 1)
      break
    }
  }
  id = Number(id)
  for (let i = 0; i < mockData.edges.length; i++) {
    if (mockData.edges[i].sourceNode === id || mockData.edges[i].targetNode === id) {
      mockData.edges.splice(i, 1)
      i--
    }
  }
}

export function modifyCondition(id, condition) {
  for (let i = 0; i < mockData.nodes.length; i++) {
    if (mockData.nodes[i].id === id) {
      mockData.nodes[i].condition = condition
      break
    }
  }
}
