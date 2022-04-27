
export const product_status_options = [
  {
    value: 2,
    label: '审核通过'
  }, {
    value: 1,
    label: '等待审核'
  }, {
    value: 0,
    label: '测试中'
  }, {
    value: -1,
    label: '审核失败'
  }
]
export const product_status_options_map = {
  '2': '审核通过',
  '1': '等待审核',
  '0': '测试中',
  '-1': '审核失败'
}

export const product_type_options = [
  {
    value: 1,
    label: '存款'
  },
  {
    value: 2,
    label: '贷款'
  }
]
export const product_type_options_map = {
  '1': '存款',
  '2': '贷款'
}

export const interest_rate_type_options = [
  // 1-年利率 2-月利率 3-日利率
  {
    value: 0,
    label: '暂不定义'
  },
  {
    value: 1,
    label: '年利率'
  }, {
    value: 2,
    label: '月利率'
  }, {
    value: 3,
    label: '日利率'
  }
]
export const interest_rate_type_options_map = {
  '0': '暂不定义',
  '1': '年利率',
  '2': '月利率',
  '3': '日利率'
}

export const activity_status_list = [
  {
    value: 1,
    label: '筛选配置'
  }, {
    value: 2,
    label: '资源配置'
  }, {
    value: 3,
    label: '等待审核'
  }, {
    value: 4,
    label: '等待开始'
  }
]
export const activity_status_map = {
  '1': '筛选配置',
  '2': '资源配置',
  '3': '等待审核',
  '4': '等待开始'
}
// 活动审核状态， 为0不进行筛选 1-等待审核 2-审核成功 -1审核失败
export const activity_audit_status_map = {
  '1': '等待审核',
  '2': '审核成功',
  '-1': '审核失败'
}

export const activity_audit_status_list = [
  {
    value: 1,
    label: '等待审核'
  }, {
    value: 2,
    label: '审核成功'
  }, {
    value: -1,
    label: '审核失败'
  }
]

export const user_status_list = [
  {
    value: 1,
    label: '正常'
  }, {
    value: -1,
    label: '冻结'
  }, {
    value: 0,
    label: '测试'
  }
]
export const user_status_map = {
  '1': '正常',
  '-1': '冻结',
  '0': '测试'
}
export const user_gender_list = [
  {
    label: '女',
    value: 1
  }, {
    label: '男',
    value: 2
  }, {
    label: '未知',
    value: 0
  }
]
export const user_gender_map = {
  '1': '女',
  '2': '男',
  '0': '未知'
}
// 订单状态 1- 等待处理 2-处理成功 -1订单失败
export const order_status_list = [
  {
    value: 1,
    label: '等待处理'
  },
  {
    value: 2,
    label: '处理成功'
  },
  {
    value: -1,
    label: '订单失败'
  }
]
export const order_status_map = {
  '1': '等待处理',
  '2': '处理成功',
  '-1': '订单失败'
}
// 支付状态 1- 未支付 2-支付 -1 -支付失败
export const payment_status_list = [
  {
    value: 1,
    label: '未支付'
  },
  {
    value: 2,
    label: '支付'
  },
  {
    value: -1,
    label: '支付失败'
  }
]
export const payment_status_map = {
  '1': '未支付',
  '2': '支付',
  '-1': '支付失败'
}

// 文章状态 1-等待审核 2-审核成功 -1-审核失败
export const tweet_status_list = [
  {
    value: 1,
    label: '等待审核'
  },
  {
    value: 2,
    label: '审核成功'
  },
  {
    value: -1,
    label: '审核失败'
  },
  {
    value: 0,
    label: '查看所有'
  }
]

export const tweet_status_map = {
  '1': '等待审核',
  '2': '审核成功',
  '-1': '审核失败'
}
