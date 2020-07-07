import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 讓 axios 預設會傳認證資訊，原本是不會傳
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
