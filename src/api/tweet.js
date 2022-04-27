import request from '@/utils/request'
// /api/article/publish
export function addArticle(form) {
  const data = new FormData()
  data.append('title', form.title)
  data.append('content', form.content)
  data.append('author', form.author)
  data.append('front_cover', form.front_cover)
  return new Promise((resolve, reject) => {
    request({
      url: '/api/article/publish',
      method: 'post',
      data
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res)
    })
  })
}

// /api/article/getList
export function getTweetList(form) {
  form.page = Number(form.page)
  form.page_size = Number(form.page_size)
  form.status = Number(form.status)
  const { page, page_size, status } = form
  return new Promise((resolve, reject) => {
    request({
      url: '/api/article/getList',
      method: 'post',
      data: JSON.stringify({ page, page_size, status })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res)
    })
  })
}

// /api/article/delete
export function deleteArticle(form) {
  const { article_id } = form
  return new Promise((resolve, reject) => {
    request({
      url: '/api/article/delete',
      method: 'delete',
      data: JSON.stringify({ article_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// /article/getArticleContentAdmin
export function getArticleContent(form) {
  const { article_id } = form
  return new Promise((resolve, reject) => {
    request({
      url: '/api/article/getArticleContentAdmin',
      method: 'post',
      data: JSON.stringify({ article_id })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res)
    })
  })
}

// /api/article/update
export function updateArticle(form) {
  const data = new FormData()
  data.append('article_id', form.article_id)
  data.append('title', form.title)
  data.append('author', form.author)
  data.append('content', form.content)
  return new Promise((resolve, reject) => {
    request({
      url: '/api/article/update',
      method: 'put',
      data
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res)
    })
  })
}
