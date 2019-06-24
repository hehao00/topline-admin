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
// 几乎所有组件都要去发请求 在组件中发请求直接 this.$hhtp({method,url...})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
