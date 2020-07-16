<template>
  <div class="home">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      fade
      controls
      indicators
      background="#ababab"
      img-width="100%"
      img-height="100vh"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- 輪播圖 -->
      <b-carousel-slide v-for="(carousel, idx) in carousels" :key="idx" :img-src="carousel.src">
      </b-carousel-slide>
    </b-carousel>

  </div>
</template>
<style>
  #carousel-1 img{
    width:100%;
    height:100vh;
    object-fit: cover;
    object-position: center;
  }
</style>
<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      carousels: []
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/carousel')
      .then(response => {
        this.carousels = response.data.result.map(d => {
          return {
            src: process.env.VUE_APP_APIURL + '/carousel/' + d.image
          }
        })
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }
}
</script>
