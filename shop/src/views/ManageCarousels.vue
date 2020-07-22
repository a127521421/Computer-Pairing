<template>
  <div id="managecarousels">
    <b-container>
      <b-breadcrumb>
        <b-breadcrumb-item to="/administrator">
          管理員
        </b-breadcrumb-item>
        <b-breadcrumb-item active>管理輪播圖</b-breadcrumb-item>
      </b-breadcrumb>
    </b-container>
    <h1 class="text-center">管理輪播圖</h1>
    <!-- 上傳 -->
    <b-container class="text-center">
      <b-form @submit="submit">
        <b-form-file
          v-model="file"
          :state="state"
          placeholder="選擇檔案或拖曳至此"
          drop-placeholder="將檔案拖曳至此"
          required
          browse-text="瀏覽"
          accept='image/*'
          @input="File"
        >
        </b-form-file>
        <b-button type="submit" variant="primary" id="cbutton">上傳</b-button>
      </b-form>
    </b-container>
    <!-- 顯示 -->
    <b-container>
      <b-row>
        <b-col v-for="(carousel, idx) in carousels" :key="idx" cols="12" md="6" lg="3" class="text-center">
          <b-img id="mcimg" :src="carousel.src" thumbnail fluid></b-img>
          <b-button variant="danger" @click="del(carousel, idx)" id="cbuttond">刪除</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
  .breadcrumb{
    background-color:transparent;
  }
  #cbutton{
    margin: 1.5rem 0;
  }
  #cbuttond{
    margin-bottom: 1.5rem;
  }
  #mcimg{
  margin-bottom: 2rem;
  height: 250px !important;
  object-fit: cover;
  object-position: center center;
  }
</style>

<script>
export default {
  data () {
    return {
      file: null,
      state: false,
      carousels: []
    }
  },
  methods: {
    File () {
      if (this.file != null) {
        if (this.file.size >= 1024 * 1024 || !this.file.type.includes('image')) {
          this.state = false
          this.file = null
        } else {
          this.state = true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.file === null || this.file.size >= 1024 * 1024 || !this.file.type.includes('image')) {
        alert('檔案格式不符')
      } else {
        // FormData 可以同時傳送檔案和表單資料
        const fd = new FormData()
        fd.append('image', this.file)

        this.axios.post(process.env.VUE_APP_APIURL + '/carousel', fd, {
          // 因為 axios 預設是送 json，所以要自己設定成 formdata
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.carousels.push(
            {
              src: process.env.VUE_APP_APIURL + '/carousel/' + response.data.image,
              _id: response.data._id
            }
          )
          this.file = null
        }).catch(error => {
          alert(error.response.data.message)
        })
      }
    },
    del (carousel, idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/carousel/' + carousel._id)
        .then(response => {
          this.carousels.splice(idx, 1)
        })
        .catch(() => {
          alert('發生錯誤')
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/carousel')
      .then(response => {
        this.carousels = response.data.result.map(d => {
          return {
            _id: d._id,
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
