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
            <br>
            <b-button variant="danger" v-if="click" @click=" click = !click">移除願望清單</b-button>
            <b-button variant="light" v-else @click=" click = !click">加到願望清單</b-button>
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
