import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
import Register from '../pages/register'
import Profile from '../pages/profile'
import EditProfile from '../pages/editProfile'
import MyFollow from '../pages/myFollow'
import MyComments from '../pages/myComments'
import MyCollect from '../pages/myCollect'
import Home from '../pages/home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/profile', component: Profile, name: 'profile' },
  { path: '/editProfile', component: EditProfile, name: 'editProfile' },
  { path: '/myFollow', component: MyFollow, name: 'myFollow' },
  { path: '/myComments', component: MyComments, name: 'myComments' },
  { path: '/myCollect', component: MyCollect, name: 'myCollect' },
  { path: '/home', component: Home, name: 'home' }

]

const router = new VueRouter({
  routes
})

// 导航守卫：拦截未登陆的用户
const AuthUrls = [
  '/profile',
  '/editProfile',
  '/myFollow',
  '/myComments',
  '/myCollect'
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
