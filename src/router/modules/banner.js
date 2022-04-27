import layout from '@/layout'

export default {
  name: 'banner',
  path: '/banner',
  component: layout,
  redirect: '/banner/index',
  meta: { title: '轮播图', icon: 'el-icon-s-promotion', roles: ['root', 'SlideShowManager'] },
  children: [
    {
      path: 'list',
      component: () => import('@/views/a-MyViews/Banner/index'),
      name: 'bannerList',
      meta: {
        title: '轮播图',
        roles: ['root', 'SlideShowManager']
      }
    }
  ]
}
