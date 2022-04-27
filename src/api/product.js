import request from '@/utils/request'

export function getProductList(form) {
  form.interest_rate_type = Number(form.interest_rate_type || 0)
  form.audit_status = Number(form.audit_status || 0)
  const { interest_rate_type, page, page_size, product_name, audit_status } = form
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/all',
      method: 'post',
      data: JSON.stringify({ interest_rate_type, page, page_size, product_name, audit_status })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}
export function getProduct(product_id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/getProduct',
      method: 'post',
      data: JSON.stringify({ product_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}
// delete product
export function deleteProduct(product_id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/delete',
      method: 'delete',
      data: JSON.stringify({ product_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}
function addLeadingZero(num, length) {
  return (Array(length).join('0') + num).slice(-length)
}
// update product
export function updateProduct(form) {
  const _2 =
    addLeadingZero(form.min_hold_time.year, 4) + '-' +
    addLeadingZero(form.min_hold_time.month, 2) + '-' +
    addLeadingZero(form.min_hold_time.day, 2)
  const _1 = {
    interest_rate_type: form.interest_rate_type,
    min_hold_time: _2,
    product_description: form.product_description,
    product_id: form.ID,
    product_interest_rate: Number(form.product_interest_rate),
    product_name: form.product_name,
    product_number: Number(form.product_number),
    product_price: Number(form.product_price),
    product_tags: form.product_tags
  }
  console.log(_1)
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/update',
      method: 'put',
      data: JSON.stringify(_1)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}

export function getProductTagList(page = 1, page_size = 1000) {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/tag/list',
      method: 'post',
      data: JSON.stringify({ page, page_size })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}

export function addProduct(form) {
  let { min_hold_time, product_interest_rate, product_number, product_price } = form
  product_interest_rate = Number(product_interest_rate)
  product_number = Number(product_number)
  product_price = Number(product_price)
  min_hold_time =
    addLeadingZero(min_hold_time.year, 4) + '-' +
    addLeadingZero(min_hold_time.month, 2) + '-' +
    addLeadingZero(min_hold_time.day, 2)
  const {
    interest_rate_type,
    product_description,
    product_name,
    product_tags
  } = form
  return new Promise((resolve, reject) => {
    request({
      url: '/api/product/release',
      method: 'post',
      data: JSON.stringify({
        interest_rate_type,
        min_hold_time,
        product_description,
        product_interest_rate,
        product_name,
        product_number,
        product_price,
        product_tags
      })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}
