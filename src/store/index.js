// Vuex: 集中式状态（数据）管理
// 把不好进行组件通信交互的组件数据放到这里
// 数据和任何组件都无关  任何组件都可以访问和修改
// 数据是响应式的  数据改变会影响组件视图更新

import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, saveUser } from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  // state 中的数据可以被任何组件访问
  state: {
    user: getUser() || {} // user 的初始数据来自本地存储
  },
  mutations: {
    // mutation 函数默认接收一个参数：state，也就是说容器的 state
    // 我们可以在这里通过 state.xxx = xxx 完成对容器状态的修改
    changeUser (state, user) {
      // 将参数 user 合并到 state.user 中
      Object.assign(state.user, user)
      // 将程序中最新的用户信息重新写入本地存储，防止刷新得到旧的本地存储中的用户信息
      saveUser(state.user)
    }
  }
})

export default store
