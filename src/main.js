import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 引入公共样式文件
import './styles/index.less'
// 配置axios的基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
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
