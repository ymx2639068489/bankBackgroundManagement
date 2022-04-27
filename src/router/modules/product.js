import layout from '@/layout'

export default {
  path: '/product',
  component: layout,
  redirect: '/product/productList',
  alwaysShow: false,
  name: 'product',
  meta: { title: '产品', icon: 'lock', roles: ['root', 'productManager'] },
  children: [
    {
      path: 'productList',
      component: () => import('@/views/a-MyViews/Product/ProductList/index'),
      name: 'productList',
      meta: { title: '产品列表', roles: ['root', 'productManager'] }
    },
    {
      path: 'productAdd',
      component: () => import('@/views/a-MyViews/Product/ProductAdd/index'),
      name: 'productAdd',
      meta: { title: '添加产品', roles: ['root', 'productManager'] },
      hidden: true
    }
  ]
}
