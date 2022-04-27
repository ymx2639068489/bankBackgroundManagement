import layout from '@/layout'

export default {
  path: '/sift',
  component: layout,
  redirect: '/sift/index',
  alwaysShow: false,
  name: 'sift',
  meta: { title: '筛选系统', icon: 'lock', roles: ['root', 'spikeActivityManager'] },
  hidden: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/a-MyViews/Sift/index'),
      name: 'siftIndex',
      meta: { title: '筛选系统', roles: ['root', 'spikeActivityManager'] }
    }
  ]
}
