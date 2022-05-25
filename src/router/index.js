/**
 * root 最高权限管理员
 * spikeActivityManager 秒杀活动管理员
 * SlideShowManager 轮播图管理员
 * userManager 用户管理员
 * adminManager 后台用户管理员
 * productManager 发布产品管理员
 * ArticleManager 发布推文管理员
 * ActivityAuditor 审核活动管理员
 * ProductAuditor 审核产品管理员
 * ArticleAuditor 审核推文管理员
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import constant from './constantRoutes'
export const constantRoutes = constant

import permissionRouter from './modules/permission'
import productRouter from './modules/product'
import activityRouter from './modules/activity'
import bannerRouter from './modules/banner'
import checkRouter from './modules/check'
import tweetRouter from './modules/tweet'
import siftRouter from './modules/sift'
// import testRouter from './modules/test'
export const asyncRoutes = [
  siftRouter,
  tweetRouter,
  bannerRouter,
  productRouter,
  activityRouter,
  permissionRouter,
  checkRouter,
  // testRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

