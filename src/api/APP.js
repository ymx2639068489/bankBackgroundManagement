import req, { upload } from '@/utils/request'

export const appIterate = (version, content, app) => {
  return new Promise((resolve, reject) => {
    const _1 = new FormData()
    _1.append('version', version)
    _1.append('content', content)
    _1.append('app', app)
    upload('/gxa/admin/app/upload', _1).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getAppIterateList = () => {
  return new Promise((resolve, reject) => {
    req({
      url: '/gxa/app/download/list',
      method: 'get'
    }).then(res => resolve(res)).catch(err => reject(err))
  })
}
