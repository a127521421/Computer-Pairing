<template>
  <b-container id="flex">
    <b-card no-body id="goodcard">
      <b-row no-gutters>
        <b-col md="6" sm="12">
          <b-card-img :src="goods.image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6" sm="12" id="goodtext">
          <b-card-text>
            <h3>{{goods.name}}</h3>
            <br>
            <h4 style="color:red">NT.{{goods.price}}</h4>
            <b-button id="button" variant="danger" v-if="click" @click="dele()">移除願望清單</b-button>
            <b-button id="button" variant="light" v-else @click="add()">加到願望清單</b-button>
            <br>
            <p id="text13px">螢幕 : {{goods.Screen}}</p>
            <p id="text13px">作業系統 : {{goods.WorkingSystem}}</p>
            <p id="text13px">CPU : {{goods.CPU}}</p>
            <p id="text13px">DRAM : {{goods.DRAM}}</p>
            <p id="text13px">HDD : {{goods.HDD}}</p>
            <p id="text13px">GPU : {{goods.GPU}}</p>
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      wishlist: '',
      goods: {
        image: 'undefined'
      },
      click: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    add () {
      this.axios.post(process.env.VUE_APP_APIURL + '/wishlist',
        { user: this.user.account, wishlist: this.goods._id }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            this.click = true
            this.wishlist = data._id
          } else {
            alert(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    dele () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/wishlist/' + this.wishlist)
        .then(response => {
          const data = response.data
          if (data.success) {
            this.click = false
            this.wishlist = ''
          } else {
            alert(data.message)
          }
        })
        .catch(() => {
          alert('發生錯誤')
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/good/' + this.$route.params.id)
      .then(response => {
        response.data.result.image = process.env.VUE_APP_APIURL + '/commodity/' + response.data.result.image
        this.goods = response.data.result
        this.axios.post(process.env.VUE_APP_APIURL + '/wishlistone/' + this.user.account, { wishlist: this.goods._id })
          .then(response => {
            const data = response.data
            if (data.success === true) {
              this.click = true
              this.wishlist = data.result[0]._id
            } else {
              this.click = false
              this.wishlist = ''
            }
          })
          .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
            alert(error.response.data.message)
          })
      })
      .catch((error) => {
        console.log(error)
        alert('發生錯誤')
      })
  }
}
</script>
