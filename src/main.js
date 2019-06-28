import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'nprogress/nprogress.css'
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUser, removeUser } from '@/utils/auth'
// 引入公共样式文件
import './styles/index.less'
// 配置axios的基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

// 解决后端返回数据中的数字超出安全范围问题
axios.defaults.transformResponse = [function (data) {
  // 使用 JSONbig.parse 转换原始数据
  try {
    // 如果是 json 格式字符串 转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串 直接原样返回给后续使用
    return data
  }
}]

// axios请求拦截器
// return config 是允许请求发送的开关
axios.interceptors.request.use(config => {
  const user = getUser()

  // 如果有 user 数据，则往本次请求中添加用户 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  return config
}, error => {
  return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(response => { // >= 200 && < 400 的状态码会进入这里
  // response 就是响应结果对象
  // 这里将 response 原样返回，那么你发请求的地方收到的就是 response
  // 我们可以控制请求收到的响应数据格式
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => { // >= 400 的状态码会进入这里
  // 如果用户 token 无效，让其跳转到登录页面
  if (error.response.status === 401) {
    // 清除本地存储中的无效 token 的用户信息
    removeUser()

    // 跳转到用户登录页面
    router.push({
      name: 'login'
    })
  }
  // 返回一个理解 reject 失败的 Promise
  // 这里抛出异常是为了能让你后续 Promise 调用能正确的收到这里的异常
  return Promise.reject(error)
})
Vue.use(ElementUI)
// 把一些需要在组件中频繁使用的成员放到 Vue.prototype中
// 几乎所有组件都要去发请求 在组件中发请求直接 this.$hhtp({method,url...})
// 给vue原型对象扩展成员的时候，最好加上一个 $ 前缀 避免和组件内部的数据成员冲突
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
