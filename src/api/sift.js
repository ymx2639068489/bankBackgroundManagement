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
