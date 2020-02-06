import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 引入样式
import './styles/iconfont.css'
import './styles/reset-mobile.css'
import 'lib-flexible'

// 导入封装的组件
import ttInput from './components/input'
import ttButton from './components/button'
import ttNav from './components/nav'

// 导入vant-ui
import { Toast } from 'vant'
Vue.component('ttInput', ttInput)
Vue.component('ttButton', ttButton)
Vue.component('ttNav', ttNav)
Vue.use(Toast)

// 阻止启动生产消息
Vue.config.productionTip = false

// axios优化,将axios请求放在vue原型上，这样其他组件发送请求时直接使用this.$axios即可，不需要再重新导入axios
Vue.prototype.$axios = axios

// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'https://localhost:3000'

// 创建根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
