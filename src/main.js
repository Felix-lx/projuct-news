import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'

// 引入样式
import './styles/iconfont.css'
import './styles/reset-mobile.css'
import 'lib-flexible'

// 导入封装的组件
import ttInput from './components/input'
import ttButton from './components/button'
import ttNav from './components/nav'
import ttHeader from './components/header'

// 导入vant-ui
import { Toast, Dialog, Field, CellGroup, Cell, RadioGroup, Radio } from 'vant'

// 给封装的组件设置组件的名字
Vue.component('ttInput', ttInput)
Vue.component('ttButton', ttButton)
Vue.component('ttNav', ttNav)
Vue.component('ttHeader', ttHeader)

Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(RadioGroup)
Vue.use(Radio)

// 阻止启动生产消息
Vue.config.productionTip = false

// axios优化,将axios请求放在vue原型上，这样其他组件发送请求时直接使用this.$axios即可，不需要再重新导入axios
Vue.prototype.$axios = axios

// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios设置拦截响应器
axios.interceptors.response.use(function (response) {
  // 对响应数据做一些通用的处理
  // 判断状态码是否是401或者信息是否是“用户信息验证失败”
  if (response.data.statusCode === 401 || response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  // 对响应错误的处理
  return Promise.reject(error)
})

// 时间过滤器
Vue.filter('time', function (input) {
  return moment(input).format('YYYY-MM-DD')
})
// 创建根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
