import layout from '@/layout'

export default {
  path: '/activity',
  component: layout,
  redirect: '/activity/activityList',
  alwaysShow: false,
  name: 'activity',
  meta: { title: '活动', icon: 'lock', roles: ['root', 'spikeActivityManager'] },
  children: [
    {
      path: 'activityList',
      component: () => import('@/views/a-MyViews/Activity/ActivityList/index'),
      name: 'activityList',
      meta: { title: '活动', roles: ['root', 'spikeActivityManager'] }
    },
    {
      path: 'activityAdd',
      component: () => import('@/views/a-MyViews/Activity/ActivityAdd/index'),
      name: 'activityAdd',
      hidden: true,
      meta: { title: '添加活动', roles: ['root', 'spikeActivityManager'], breadcrumb: false }
    },
    {
      path: 'addActivityGuidance',
      component: () => import('@/views/a-MyViews/Activity/AddActivityGuidance/index'),
      name: 'addActivityGuidance',
      hidden: true,
      meta: { title: '活动引导信息', roles: ['root', 'spikeActivityManager'], breadcrumb: false }
    },
    {
      path: 'viewActiveUsers',
      component: () => import('@/views/a-MyViews/Activity/ViewActiveUsers/index'),
      name: 'viewActiveUsers',
      hidden: true,
      meta: { title: '活动流量', roles: ['root', 'spikeActivityManager'], breadcrumb: false }
    },
    {
      path: 'updateActivity',
      component: () => import('@/views/a-MyViews/Activity/UpdateActivity/index'),
      name: 'updateActivity',
      hidden: true,
      meta: { title: '更新活动', roles: ['root', 'spikeActivityManager'], breadcrumb: false }
    },
    {
      path: 'viewActivityOrder',
      component: () => import('@/views/a-MyViews/Activity/ViewActivityOrder/index'),
      name: 'viewActivityOrder',
      hidden: true,
      meta: { title: '活动订单', roles: ['root', 'spikeActivityManager'], breadcrumb: false }
    }
  ]
}
