import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
import Register from '../pages/register'
import Profile from '../pages/profile'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/profile', component: Profile, name: 'profile' }
]

const router = new VueRouter({
  routes
})

export default router
