import req from '@/utils/request'

// 获取所有用户信息
export function getUserList(form) {
  const { page } = form
  let { age, gender, status, page_size } = form
  age = Number(age)
  gender = Number(gender)
  status = Number(status)
  page_size = Number(page_size)
  return new Promise((resolve, reject) => {
    req({
      url: '/api/user/list',
      method: 'post',
      data: JSON.stringify({ page, page_size, age, gender, status })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.data)
    })
  })
}

export function updateUser(form) {
  const { nick_name, occupation, user_uuid } = form
  let { status } = form
  status = Number(status)
  return new Promise((resolve, reject) => {
    req({
      url: '/api/user/update',
      method: 'put',
      data: JSON.stringify({ nick_name, occupation, user_uuid, status })
    }).then(res => {
      if (res.code !== 0) reject(res.msg)
      else resolve(res.msg)
    })
  })
}
