import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
import Register from '../pages/register'
import Profile from '../pages/profile'
import EditProfile from '../pages/editProfile'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/profile', component: Profile, name: 'profile' },
  { path: '/editProfile', component: EditProfile, name: 'editProfile' }
]

const router = new VueRouter({
  routes
})

// 导航守卫：拦截未登陆的用户
const AuthUrls = [
  '/profile',
  '/editProfile'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
