import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入样式
import './styles/iconfont.css'
import './styles/reset-mobile.css'
import 'lib-flexible'
Vue.config.productionTip = false
// 创建根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
