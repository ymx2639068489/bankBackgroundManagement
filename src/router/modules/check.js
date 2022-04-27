import layout from '@/layout'

export default {
  path: '/check',
  component: layout,
  alwaysShow: false,
  name: 'check',
  meta: { title: '审核', icon: 'lock', roles: ['root', 'ProductAuditor', 'ActivityAuditor', 'ArticleAuditor'] },
  children: [
    {
      path: 'activityCheck',
      component: () => import('@/views/a-MyViews/Check/activity/index'),
      name: 'activityCheck',
      meta: { title: '审核活动', roles: ['root', 'ActivityAuditor'] }
    },
    {
      path: 'productCheck',
      component: () => import('@/views/a-MyViews/Check/product/index'),
      name: 'productCheck',
      meta: { title: '审核产品', roles: ['root', 'ProductAuditor'] }
    },
    {
      path: 'tweetCheck',
      component: () => import('@/views/a-MyViews/Check/tweet/index'),
      name: 'tweetCheck',
      meta: { title: '审核推文', roles: ['root', 'ArticleAuditor'] }
    }
  ]
}
