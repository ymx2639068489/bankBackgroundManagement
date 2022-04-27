import layout from '@/layout'

export default {
  path: '/tweet',
  component: layout,
  redirect: '/tweet/list',
  name: 'Tweet',
  meta: { title: '推文', icon: 'chart', roles: ['root', 'ArticleManager'] },
  children: [
    {
      path: 'list',
      component: () => import('@/views/a-MyViews/Tweet/list'),
      name: 'tweetList',
      meta: { title: '推文', icon: 'table', roles: ['root', 'ArticleManager'] }
    },
    {
      path: 'addTweet',
      component: () => import('@/views/a-MyViews/Tweet/addTweet'),
      name: 'addTweet',
      meta: { title: '添加推文', icon: 'table', roles: ['root', 'ArticleManager'] },
      hidden: true
    },
    {
      path: 'update/:id(\\d+)',
      component: () => import('@/views/a-MyViews/Tweet/updateTweet'),
      name: 'updateTweet',
      meta: { title: '更新推文', icon: 'table', roles: ['root', 'ArticleManager'] },
      hidden: true
    },
    {
      path: 'showMore/:id(\\d+)',
      component: () => import('@/views/a-MyViews/Tweet/showMore'),
      name: 'showMore',
      mate: { title: '推文详情', icon: 'table', roles: ['root', 'ArticleManager'] },
      hidden: true
    }
  ]
}
