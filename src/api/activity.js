import require from '@/utils/request'
import { parseTime } from '@/utils/index'
export function getActivityList(form) {
  const { activity_status, audit_status, page, page_size, start_time, ending_time } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/list',
      method: 'post',
      data: JSON.stringify({ activity_status, audit_status, page, page_size, start_time, ending_time })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export function delActivity(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api//spikeActivity/delete',
      method: 'delete',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}
// getActivityUserRecord
export function getActivityUserRecord(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/getActivityUserRecord',
      method: 'post',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}
// getActivityGuidanceInformation
export function getActivityGuidanceInformation(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/getActivityGuidanceInformation',
      method: 'post',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

// updateGuidanceInformation
export function updateGuidanceInformation(form) {
  const _1 = new FormData()
  _1.append('activity_id', form.activity_id)
  _1.append('fileNumber', form.fileNumber)
  _1.append('file', form.file)
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/update',
      method: 'post',
      data: _1
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export function updateActivity(form) {
  form.product_id = Number(form.product_id)
  console.log(form)
  form.start_time = parseTime(form.start_time, '{y}-{m}-{d} {h}:{i}:{s}')
  form.ending_time = parseTime(form.ending_time, '{y}-{m}-{d} {h}:{i}:{s}')
  console.log(form)
  const { product_id, activity_id, activity_name, description, ending_time, roles_introduction, start_time } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/update',
      method: 'put',
      data: JSON.stringify({ activity_id, activity_name, description, ending_time, product_id, roles_introduction, start_time })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getActivityGuidance(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/getActivityGuidanceInformation',
      method: 'post',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export function addGuidanceInformation(form, f) {
  return new Promise((resolve, reject) => {
    require({
      url: !f ? '/api/spikeActivity/addGuidanceInformation' : '/api/spikeActivity/updateGuidanceInformation',
      method: 'post',
      data: form
    }).then(res => {
      resolve(res.msg)
    })
  })
}

export function addActivity(form) {
  const product_id = Number(form.product_id.match(/[0-9]+/))
  const ending_time = parseTime(form.ending_time)
  const start_time = parseTime(form.start_time)
  const { activity_name, description, roles_introduction } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/release',
      method: 'post',
      data: JSON.stringify({ activity_name, description, ending_time, product_id, roles_introduction, start_time })
    }).then(res => {
      resolve(res.msg)
    })
  })
}
// /spikeActivity/getActivityInfoByID
export function getActivityInfomation(activity_id) {
  return new Promise((resolve, reject) => {
    require({
      url: '/api/spikeActivity/getActivityInfoByID',
      method: 'post',
      data: JSON.stringify({ activity_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

// /order/getOrderListByActivityID
export function getOrderList(form) {
  form.activity_id = Number(form.activity_id)
  form.order_status = Number(form.order_status)
  form.page = Number(form.page)
  form.page_size = Number(form.page_size)
  const { activity_id, order_status, page, page_size } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/order/getOrderListByActivityID',
      method: 'post',
      data: JSON.stringify({ activity_id, order_status, page, page_size })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}
