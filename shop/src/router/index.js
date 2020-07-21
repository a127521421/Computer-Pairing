import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '首頁'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: 'CP | 註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: false,
      title: 'CP | 登入'
    }
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: () => import(/* webpackChunkName: "shopping" */ '../views/Shopping.vue'),
    meta: {
      login: true,
      title: 'CP | 目錄'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      login: true,
      title: 'CP | 會員中心'
    }
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: () => import(/* webpackChunkName: "changepassword" */ '../views/ChangePassword.vue'),
    meta: {
      login: true,
      title: 'CP | 會員中心-修改密碼'
    }
  },
  {
    path: '/administrator',
    name: 'Administrator',
    component: () => import(/* webpackChunkName: "administrator" */ '../views/Administrator.vue'),
    meta: {
      login: true,
      title: 'CP | 管理員'
    }
  }
]

const router = new VueRouter({
  routes
})

// 在跳轉頁面前判斷是否登陸
router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

// 顯示標題
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
