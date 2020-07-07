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
    path: '/shooping',
    name: 'Shooping',
    component: () => import(/* webpackChunkName: "shooping" */ '../views/Shooping.vue'),
    meta: {
      login: true,
      title: 'CP | 目錄'
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
