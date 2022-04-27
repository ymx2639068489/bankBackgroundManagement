import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: 'https://qiaohuhu.xyz:8000/',
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
      config.headers['Cache-Control'] = 'no-cache'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200) {
      Message({
        message: 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      // console.log(res)
      return res.data
    }
  },
  error => {
    Message({
      message: '账号密码错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function upload(url, params) {
  return service.post(url, params, { 'Content-Type': 'multipart/form-data' })
}

export default service
