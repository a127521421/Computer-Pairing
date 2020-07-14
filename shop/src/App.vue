<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">LOGO</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  height:100vh;
  text-align: center;
  background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
}
</style>
