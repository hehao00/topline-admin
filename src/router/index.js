import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
