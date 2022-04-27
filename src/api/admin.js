import request from '@/utils/request'

// 获取所有管理员列表
export const getAdminList = (page, page_size = 20) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/getAdminInfoList',
      method: 'post',
      data: JSON.stringify({ page, page_size })
    }).then(res => {
      const _1 = []
      res.data.data.forEach(i => {
        const _2 = []
        for (const j of i.authorities) _2.push(j.authority_name)
        _1.push({
          ID: i.ID,
          create_by_username: i.create_by_username,
          created_at: i.created_at,
          email: i.email,
          login_ip: i.login_ip,
          login_time: i.login_time,
          nick_name: i.nick_name,
          phone: i.phone,
          username: i.username,
          roles: _2,
          uuid: i.uuid,
          status: i.status
        })
      })
      resolve({
        data: _1,
        total: res.data.total
      })
    })
  })
}

// 创建一个管理员
export const createAdmin = (data) => {
  console.log(data)
  const { email, is_random_password, password, phone, username } = data
  let { status } = data
  status = Number(status)
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/generateAdminAccount',
      method: 'post',
      data: JSON.stringify({ email, is_random_password, password, phone, username, status })
    }).then(res => {
      console.log(res)
      if (res.code !== 0) reject(res.msg)
      resolve(res.msg)
    })
  })
}

// 获取管理员对应的所有权限
export const getAdminRolesList = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/authority/all',
      method: 'post',
      data: JSON.stringify({ page: 1, page_size: 100 })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

// 分配权限
export const doAssignRole = (authority_id, uuid) => {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/admin/setAdminAuthorities',
      method: 'put',
      data: JSON.stringify({ authority_id, uuid })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      resolve(res.data)
    })
  })
}

export const updateCurrenAdminInfo = form => {
  const { UUID, email, nick_name, phone } = form
  let { status } = form
  status = status ? 0 : 1
  return new Promise((resolve, reject) => {
    if (!UUID) reject('UUID不能为空')
    else {
      request({
        url: '/api/admin/setAdminInfo',
        method: 'put',
        data: JSON.stringify({ UUID, email, nick_name, phone, status })
      }).then(res => {
        if (res.code !== 0) reject(res.msg)
        resolve(res.msg)
      })
    }
  })
}

export const updateAdminPassword = form => {
  const { UUID, password, newPassword } = form
  return new Promise((resolve, reject) => {
    if (!UUID) reject('UUID不能为空')
    else {
      request({
        url: '/api/admin/changePassword',
        method: 'put',
        data: JSON.stringify({ UUID, password, newPassword })
      }).then(res => {
        if (res.code !== 0) reject(res.msg)
        resolve(res.data)
      })
    }
  })
}
