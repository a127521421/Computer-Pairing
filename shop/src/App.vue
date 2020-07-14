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
            <b-nav-item to="/login">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" id="icon"></font-awesome-icon>
            </b-nav-item>
            <!-- 個人資料 -->
            <b-nav-item to="/user">
              <font-awesome-icon :icon="['fas', 'house-user']" id="icon"></font-awesome-icon>
            </b-nav-item>
            <!-- 註冊 -->
            <b-nav-item to="/reg">
              <font-awesome-icon :icon="['fas', 'registered']" id="icon"></font-awesome-icon>
            </b-nav-item>
            <!-- 登出 -->
            <b-nav-item>
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" id="icon"></font-awesome-icon>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
      <router-view/>
  </div>
</template>

<style>
#app {
  height:100vh;
  background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
}
#icon {
  font-size: 1.5rem;
}
</style>
