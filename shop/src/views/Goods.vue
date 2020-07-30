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
            <b-button id="button" variant="danger" v-if="click" @click=" click = !click">移除願望清單</b-button>
            <b-button id="button" variant="light" v-else @click=" click = !click">加到願望清單</b-button>
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
      goods: {},
      click: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/good/' + this.$route.params.id)
      .then(response => {
        response.data.result.image = process.env.VUE_APP_APIURL + '/commodity/' + response.data.result.image
        this.goods = response.data.result
      })
      .catch((error) => {
        console.log(error)
        alert('發生錯誤')
      })
  }
}
</script>
