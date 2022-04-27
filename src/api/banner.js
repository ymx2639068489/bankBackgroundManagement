import req, { upload } from '@/utils/request'

export const getBannerList = () => {
  return new Promise((resolve, reject) => {
    req({
      url: '/api/SlideShow/listAdmin',
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addBannerItem = item => {
  return new Promise((resolve, reject) => {
    const _2 = new FormData()
    _2.append('file', item.file)
    _2.append('title', item.title)
    _2.append('weight', item.weight)
    _2.append('description', item.description)
    upload('/api/SlideShow/add', _2).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteBannerItem = slide_show_id => {
  return new Promise((resolve, reject) => {
    req({
      url: '/api/SlideShow/delete',
      method: 'delete',
      data: JSON.stringify({ slide_show_id })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateBannerItem = from => {
  console.log(from)
  const { description, title, slide_show_id, weight } = from
  return new Promise((resolve, reject) => {
    req({
      url: '/api/SlideShow/update',
      method: 'put',
      data: JSON.stringify({ description, title, slide_show_id, weight })
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
