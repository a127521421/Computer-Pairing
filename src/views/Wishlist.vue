<template>
  <b-container>
    <h1 class="text-center">願望清單</h1>
    <b-row>
      <b-col cols="12">
        <b-table striped hover :items="goods" :fields="fields">
          <template v-slot:cell(src)="data">
            <img :src="data.item.src" style="width:100px">
          </template>
          <template v-slot:cell(_id)="data">
            <b-button  variant="danger" @click="jump(data.item._id)">跳轉網頁</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      goods: [],
      fields: [
        {
          key: 'src',
          label: '圖片'
        },
        {
          key: 'name',
          label: '商品名稱'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: '_id',
          label: '跳轉'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    jump (id) {
      this.$router.push('/goods/' + id)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/wishlist/' + this.user.account)
      .then(response => {
        this.goods = response.data.result2.map(d => {
          return {
            _id: d._id,
            src: process.env.VUE_APP_APIURL + '/commodity/' + d.image,
            name: d.name,
            price: d.price
          }
        })
      })
  }
}
</script>
