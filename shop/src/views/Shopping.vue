<template>
  <div id="shopping">
    <b-container class="text-center">
      <h1>商品目錄</h1>
      <b-row>
        <b-col v-for="(commodity, idx) in commoditys" :key="idx" cols="12" md="6" lg="3" class="d-flex">
          <b-card
            :img-src="commodity.src"
            img-alt="Image"
            img-top
            style="max-width:300px;max-height:500px"
            @click="jump(commodity._id)"
          >
            <b-card-text>
              <h3>型號</h3><p>{{commodity.name}}</p>
              <h3>價格</h3><p>{{commodity.price}}</p>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.row {
  justify-content:center;
}
.d-flex{
  justify-content:center;
}
#shopping .card{
  margin-bottom: 2rem;
  transition: 0.3s;
  border: 5px solid #eeeeee !important;
  box-shadow: 0 0 0 1px #c7c7c7;
}
#shopping .card:hover {
  transform: translateY(-1rem);
}
</style>

<script>
export default {
  data () {
    return {
      commoditys: []
    }
  },
  methods: {
    jump (id) {
      this.$router.push('/commodity/' + id)
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
