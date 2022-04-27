import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true,
  name: 'Permission',
  meta: {
    title: '用户管理',
    icon: 'lock',
    roles: ['root', 'userManager', 'adminManager']
  },
  children: [
    {
      path: 'directive',
      component: () => import('@/views/a-MyViews/user/user/index'),
      name: 'DirectivePermission',
      meta: {
        title: '前台用户管理',
        roles: ['root', 'userManager']
      }
    },
    {
      path: 'role',
      component: () => import('@/views/a-MyViews/user/admin/index'),
      name: 'RolePermission',
      meta: {
        title: '后台用户管理',
        roles: ['root', 'adminManager']
      }
    }
  ]
}
