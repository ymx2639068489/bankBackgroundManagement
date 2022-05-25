import require from '@/utils/request'

export function getTbaleName() {
  return new Promise((resolve, _reject) => {
    require.get('/api/filter/tableList').then(res => {
      resolve(res.data)
    })
  })
}

export function getFieldList(table_name) {
  return new Promise((resolve, _reject) => {
    require.post('/api/filter/fieldList', { table_name }).then(res => {
      resolve(res.data)
    })
  })
}

// /filter/list
export function getFilterList() {
  return new Promise((resolve, _reject) => {
    require.get('/api/filter/list').then(res => {
      resolve(res.data)
    })
  })
}

// /filter/listByActivityID
export function getFilterListByActivityID(activity_id) {
  return new Promise((resolve, _reject) => {
    require.post('/api/filter/getFilterRolesByID', { activity_id }).then(res => {
      resolve(res.data)
    })
  })
}

// /filter/finishFilterConfiguration
export function finishFilterConfig(activity_id) {
  console.log(activity_id)
  return new Promise((resolve, reject) => {
    require({ url: '/api/filter/finishFilterConfiguration', method: 'post', data: JSON.stringify({ activity_id }) }).then(res => {
      resolve(res.msg)
    })
  })
}
// /filter/setValueRange
export function setValueRange(form) {
  const { activity_id, description, error_tips, field_name, filter_table_id, value_range } = form
  return new Promise((resolve, reject) => {
    require.post('/api/filter/setValueRange', { activity_id, description, error_tips, field_name, filter_table_id, value_range }).then(res => {
      resolve(res.msg)
    })
  })
}

// /filter/delete
export function deleteFilter(activity_id) {
  return new Promise((resolve, reject) => {
    require.post('/api/filter/delete', { activity_id }).then(res => {
      resolve(res.msg)
    })
  })
}

// /filter/list
export function getFilterListByFilterTableID() {
  return new Promise((resolve, _reject) => {
    require.get('/api/filter/list').then(res => {
      resolve(res.data)
    })
  })
}

// /filter/finishFilterConfiguration
export function finishFilterConfigByFilterTableID(activity_id) {
  return new Promise((resolve, reject) => {
    require.post('/api/filter/finishFilterConfiguration', { activity_id }).then(res => {
      resolve(res.msg)
    })
  })
}

// /filter/deleteByID
export function deleteFilterByID(filter_roles_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/filter/deleteByID',
      method: 'delete',
      data: JSON.stringify({ filter_roles_id })
    }).then(res => {
      resolve(res.msg)
    })
  })
}
// 过滤筛选条件
export function sureSift({ data, activity_id }) {
  return new Promise((resolve, reject) => {
    const nodes = []
    const edges = []
    // 提出所需要的数据
    for (const item of data.nodes) {
      nodes.push({
        id: Number(item.id),
        field_name: item.field_name,
        table_name: item.table_name,
        condition: item.condition,
        activity_id,
        top: item.top,
        left: item.left
      })
    }
    let idx = 0
    for (const item of data.edges) {
      edges.push({
        id: idx++,
        activity_id,
        source_node_id: Number(item.sourceNode),
        target_node_id: Number(item.targetNode)
      })
    }
    nodes.sort((a, b) => a.id - b.id)
    // console.log(nodes)
    // console.log(edges)
    // 判断有没有单点没有连接到图中
    const visNode = new Array(nodes.length + 1)
    const visEdges = new Array(edges.length + 1)
    const q = [] // 队列
    q.push(1) // 从1开始跑
    visNode[1] = true
    visEdges[1] = true
    while (q.length) {
      const index = q.shift()
      for (const item of edges) {
        if (Number(item.source_node_id) === index) {
          visEdges[Number(item.id)] = true
          visNode[Number(item.target_node_id)] = true
          q.push(Number(item.target_node_id))
        }
      }
    }
    // 多余的没有链接到图中的节点
    for (let i = 0; i < nodes.length; i++) {
      if (!visNode[nodes[i].id]) {
        nodes.splice(i, 1)
        i--
      }
    }
    // 多余的没有链接到图中的边
    for (let i = 0; i < edges.length; i++) {
      if (!visEdges[edges[i].id]) {
        edges.splice(i, 1)
        i--
      }
    }
    resolve({ nodes, edges })
  })
}

// /finish/finishFilterConfiguration2
export function finishFilterConfiguration({ activity_id, edge, node }) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/filter/finishFilterConfiguration2',
      method: 'post',
      data: JSON.stringify({ activity_id, edge, node })
    }).then(res => {
      // console.log(res)
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}

// /filter/getFilterTree
export function getFilterTree(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/filter/getFilterTree',
      method: 'post',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      resolve(res.data)
    })
  })
}
