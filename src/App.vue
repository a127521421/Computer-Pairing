<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <!-- LOGO -->
        <b-navbar-brand to='/'><font-awesome-icon :icon="['fas', 'desktop']" id="icon"></font-awesome-icon>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="m-auto">
            <!-- 商品目錄 -->
            <b-nav-item to="/shopping">
              <span>商品目錄</span>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <!-- 登入 -->
            <b-nav-item v-if="user.length === 0" to="/login">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" id="icon" title="登入"></font-awesome-icon>
            </b-nav-item>
            <!-- 個人資料 -->
            <b-nav-item v-else to="/user">
              <font-awesome-icon :icon="['fas', 'house-user']" id="icon" title="個人資料"></font-awesome-icon>
            </b-nav-item>
            <!-- 註冊 -->
            <b-nav-item v-if="user.length === 0" to="/reg">
              <font-awesome-icon :icon="['fas', 'registered']" id="icon" title="註冊"></font-awesome-icon>
            </b-nav-item>
            <!-- 登出 -->
            <b-nav-item v-else @click="logout">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" id="icon" title="登出"></font-awesome-icon>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view class="page" />
    <footer id="footer">
      <span>Computer pairing 版權所有 © All Rights Reserved.</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            alert('登出成功')
            // 呼叫 vuex 的登入
            this.$store.commit('logout')
            // 跳到登出後的首頁
            // rotue 可以知道訊息
            // console.log(this.$route)
            // 如果現在不是在首頁，跳到登出後的首頁
            // router 可以操作
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            // 不是就顯示回來的 message
            alert(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat')
        .then(response => {
          const data = response.data
          // 如果是登入中
          if (this.user.length > 0) {
            // 如果後端登入時間過期
            if (!data) {
              alert('登入時效已過')
              // 前端登出
              this.$store.commit('logout')
              // 如果現在不是在首頁，跳到登出後的首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          alert('發生錯誤')
          this.$store.commit('logout')
          // 如果現在不是在首頁，跳到登出後的首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 1000 * 5)
  }
}
</script>
