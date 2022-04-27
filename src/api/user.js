import request from '@/utils/request'

export const login = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/login',
      method: 'post',
      data: JSON.stringify(data)
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// get user infomation
export const getInfo = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/getInformation',
      method: 'get'
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 200,
      data: null
    })
  })
}

export const getCaptcha = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/base/captcha'
    }).then(res => {
      resolve(res)
    })
  })
}

export const updateUserPassword = (data) => {
  const { new_password, password } = data
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/changeSelfPassword',
      method: 'put',
      data: JSON.stringify({ new_password, password })
    }).then(res => {
      console.log(res)
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
