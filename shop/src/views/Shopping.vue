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
          >
            <b-card-text>
              {{commodity.name}}
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
.card{
  margin-bottom: 2rem;
}
</style>

<script>
export default {
  data () {
    return {
      commoditys: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/commodity')
      .then(response => {
        this.commoditys = response.data.result.map(d => {
          return {
            name: d.name,
            price: d.price,
            description: d.description,
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
