<template>
  <div id="changepassword">
    <b-container class="text-center">
      <h1>修改密碼</h1>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <img src="../assets/change.gif" style="width:100%">
          </b-col>
          <b-col md="6" id="changepassword2">
            <b-card-body id="cardbody">
              <h3>請輸入新密碼</h3>
              <b-form>
                <b-form-group
                  label="新密碼"
                  label-for="input-password"
                  description="密碼長度為 4 - 20 個字"
                  invalid-feedback="密碼格式不符"
                  :state="state('password')">
                  <b-form-input id="input-password" type="password" v-model="password" :state="state('password')">
                  </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" @click="update()">更新</b-button>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

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
    state (type) {
      if (type === 'password') {
        if (this.password.length < 4 || this.password.length > 20) {
          return false
        } else {
          return true
        }
      }
    },
    update () {
      this.axios.patch(process.env.VUE_APP_APIURL + '/usersupdate/' + this.user._id, { password: this.password })
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
          this.password = ''
        })
    }
  }
}
</script>
