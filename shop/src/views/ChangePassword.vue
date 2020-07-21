<template>
  <div id="changepassword">
    <b-container class="text-center">
      <h1>修改密碼</h1>
      <b-row>
        <b-col cols="12">
          <b-form>
            <div>
                <h3>新密碼</h3>
                <b-form-input type="password" v-model="password"></b-form-input>
            </div>
            <br>
            <b-button type="submit" variant="primary" @click="update(user)">更新</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <footer id="passwordfooter">
      <span>Computer pairing 版權所有 © All Rights Reserved.</span>
    </footer>
  </div>
</template>

<style>
#passwordfooter {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  text-align: center;
  color: black;
  font-size: 2rem;
  font-family: '微軟正黑體';
  position: absolute;
  bottom: 0;
  left:50%;
  transform: translate(-50%);
}
@media (max-width: 576px) {
  #passwordfooter {
    font-size:1rem;
  }
}
</style>

<script>
export default {
  name: 'changepassword',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    update (user) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/usersupdate/' + user._id, { password: this.password })
        .then(response => {
          const data = response.data
          if (data.success) {
            alert('修改成功')
            this.password = ''
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    }
  }
}
</script>
