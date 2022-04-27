import request from '@/utils/request'

// 提前加载缓存
export function setCache(activity_id) {
  return request({
    url: '/api/spikeActivity/cache',
    method: 'post',
    data: JSON.stringify({ activity_id })
  })
}

// 获取缓存信息
export function getCache(activity_id) {
  return request({
    url: '/api/spikeActivity/getCacheSpike',
    method: 'post',
    data: JSON.stringify({ activity_id })
  })
}
