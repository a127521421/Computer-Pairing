<template>
  <div id="managegoods">
    <b-container>
      <b-breadcrumb>
        <b-breadcrumb-item to="/administrator">
          管理員
        </b-breadcrumb-item>
        <b-breadcrumb-item active>管理商品</b-breadcrumb-item>
      </b-breadcrumb>
    </b-container>
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
        <b-form-textarea v-model="name" placeholder="型號"></b-form-textarea>
        <b-form-textarea v-model="price" placeholder="價格"></b-form-textarea>
        <b-form-textarea v-model="Screen" placeholder="螢幕"></b-form-textarea>
        <b-form-textarea v-model="WorkingSystem" placeholder="作業系統"></b-form-textarea>
        <b-form-textarea v-model="CPU" placeholder="CPU"></b-form-textarea>
        <b-form-textarea v-model="DRAM" placeholder="DRAM"></b-form-textarea>
        <b-form-textarea v-model="HDD" placeholder="HDD"></b-form-textarea>
        <b-form-textarea v-model="GPU" placeholder="GPU"></b-form-textarea>
        <b-form-textarea v-model="count" placeholder="庫存"></b-form-textarea>
        <b-button type="submit" variant="primary" id="cbutton">上傳</b-button>
      </b-form>
    </b-container>
    <!-- 顯示 -->
    <b-container>
      <b-row>
        <b-col v-for="(commodity, idx) in commoditys" :key="idx" cols="12" md="6" lg="3" class="text-center">
          <b-card
            :img-src="commodity.src"
            img-top
            tag="article"
            class="mb-2">
            <b-card-text>
              <h3>型號</h3>
              <p>{{commodity.name}}</p>
              <h3>價格</h3>
              <p>{{commodity.price}}</p>
              <h3>螢幕</h3>
              <p>{{commodity.Screen}}</p>
              <h3>作業系統</h3>
              <p>{{commodity.WorkingSystem}}</p>
              <h3>CPU</h3>
              <p>{{commodity.CPU}}</p>
              <h3>DRAM</h3>
              <p>{{commodity.DRAM}}</p>
              <h3>HDD</h3>
              <p>{{commodity.HDD}}</p>
              <h3>GPU</h3>
              <p>{{commodity.GPU}}</p>
              <h3>庫存</h3>
              <p>{{commodity.count}}</p>
            </b-card-text>
            <b-button variant="danger" @click="del(commodity, idx)" id="cbuttond">刪除</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
  .breadcrumb{
    background-color:transparent;
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
      commoditys: [],
      name: '',
      price: '',
      Screen: '',
      WorkingSystem: '',
      CPU: '',
      DRAM: '',
      HDD: '',
      GPU: '',
      count: ''
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
        fd.append('name', this.name)
        fd.append('price', this.price)
        fd.append('Screen', this.Screen)
        fd.append('WorkingSystem', this.WorkingSystem)
        fd.append('CPU', this.CPU)
        fd.append('DRAM', this.DRAM)
        fd.append('HDD', this.HDD)
        fd.append('GPU', this.GPU)
        fd.append('count', this.count)

        this.axios.post(process.env.VUE_APP_APIURL + '/commodity', fd, {
          // 因為 axios 預設是送 json，所以要自己設定成 formdata
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.commoditys.push(
            {
              _id: response.data._id,
              name: this.name,
              price: this.price,
              Screen: this.Screen,
              WorkingSystem: this.WorkingSystem,
              CPU: this.CPU,
              DRAM: this.DRAM,
              HDD: this.HDD,
              GPU: this.GPU,
              count: this.count,
              src: process.env.VUE_APP_APIURL + '/commodity/' + response.data.image
            }
          )
          this.file = null
          this.name = ''
          this.price = ''
          this.Screen = ''
          this.WorkingSystem = ''
          this.CPU = ''
          this.DRAM = ''
          this.HDD = ''
          this.GPU = ''
          this.count = ''
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
