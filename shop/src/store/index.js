import Vue from 'vue'
import Vuex from 'vuex'
// 將狀態存在 localStorage 或 cookie
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    login (state, data) {
      state.user = data
    },
    logout (state) {
      state.user = ''
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
