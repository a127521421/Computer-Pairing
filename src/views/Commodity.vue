<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card>
          <p>{{goods.name}}</p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      goods: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/good/' + this.$route.params.id)
      .then(response => {
        response.data.result.src = process.env.VUE_APP_APIURL + '/commodity/' + response.data.result.image
        this.goods = response.data.result
      })
      .catch((error) => {
        console.log(error)
        alert('發生錯誤')
      })
  }
}
</script>
