import require from '@/utils/request'

export function auditActivity(form) {
  const { activityID, message, result } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/audit/activity',
      method: 'post',
      data: JSON.stringify({ activityID, message, result })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function auditArticle(form) {
  const { articleID, message, result } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/audit/article',
      method: 'post',
      data: JSON.stringify({ articleID, message, result })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function auditProduct(form) {
  const { productID, message, result } = form
  return new Promise((resolve, reject) => {
    require({
      url: '/api/audit/product',
      method: 'post',
      data: JSON.stringify({ productID, message, result })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
