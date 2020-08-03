<template>
  <div id="shopping">
    <b-container>
      <h1  class="text-center">商品目錄</h1>
      <b-row id="shoppingrow">
        <b-col v-for="(commodity, idx) in commoditys" :key="idx" cols="12" md="6" lg="3" class="d-flex justify-content-center">
          <b-card
            :img-src="commodity.src"
            img-alt="Image"
            img-top
            style="max-width:300px;max-height:500px"
            @click="jump(commodity._id)"
          >
            <b-card-text>
              <p>{{commodity.name}}</p>
              <p style="color:red">NT.{{commodity.price}}</p>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commoditys: []
    }
  },
  methods: {
    jump (id) {
      this.$router.push('/goods/' + id)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/commodity')
      .then(response => {
        this.commoditys = response.data.result.map(d => {
          return {
            _id: d._id,
            name: d.name,
            price: d.price,
            Screen: d.Screen,
            WorkingSystem: d.WorkingSystem,
            CPU: d.CPU,
            DRAM: d.DRAM,
            HDD: d.HDD,
            GPU: d.GPU,
            count: d.count,
            src: process.env.VUE_APP_APIURL + '/commodity/' + d.image
          }
        })
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }
}
</script>
