import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home')
    // },
    { // layout 显示到 App 根组件的路由出口
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [ // 所有的 children 路由都显示到父路由的 router-view 中
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
// 全局前置守卫
// 当你访问路由页面的时候，会先进入这里
// to 要去哪里的相关数据
// from 来自哪里的相关数据
// next 允许通过的方法
router.beforeEach((to, from, next) => {
  nprogress.start()
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 非登陆页面
    // 没有登陆，跳转到登陆页
    if (!userInfo) {
      // 手动结束动画 防止出现在登陆页面访问其他页面顶部一直 loading 的问题、
      if (from.path === '/login') {
        nprogress.done()
      }
      next({ name: 'login' })
    } else {
      // 登陆了 允许通过
      next()
    }
  } else {
    // 登陆页面
    // 没有登陆 允许通过
    if (!userInfo) {
      next()
    } else {
      // 登陆了 不允许通过
      next({ name: 'home' })
      window.location.reload()
    }
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
