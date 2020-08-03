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
        <b-button type="submit" variant="primary" id="button">上傳</b-button>
      </b-form>
    </b-container>
    <!-- 顯示 -->
    <b-container v-for="(commodity, idx) in commoditys" :key="idx" class="text-center">
      <b-card class="mb-2 overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="commodity.src" class="rounded-0" id="mgimg"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-text>
              <h3>型號</h3>
              <p v-if="!commodity.edit">{{commodity.name}}</p>
              <b-form-textarea v-else v-model="name"></b-form-textarea>
              <h3>價格</h3>
              <p v-if="!commodity.edit">{{commodity.price}}</p>
              <b-form-textarea v-else v-model="price"></b-form-textarea>
              <h3>螢幕</h3>
              <p v-if="!commodity.edit">{{commodity.Screen}}</p>
              <b-form-textarea v-else v-model="Screen"></b-form-textarea>
              <h3>作業系統</h3>
              <p v-if="!commodity.edit">{{commodity.WorkingSystem}}</p>
              <b-form-textarea v-else v-model="WorkingSystem"></b-form-textarea>
              <h3>CPU</h3>
              <p v-if="!commodity.edit">{{commodity.CPU}}</p>
              <b-form-textarea v-else v-model="CPU"></b-form-textarea>
              <h3>DRAM</h3>
              <p v-if="!commodity.edit">{{commodity.DRAM}}</p>
              <b-form-textarea v-else v-model="DRAM"></b-form-textarea>
              <h3>HDD</h3>
              <p v-if="!commodity.edit">{{commodity.HDD}}</p>
              <b-form-textarea v-else v-model="HDD"></b-form-textarea>
              <h3>GPU</h3>
              <p v-if="!commodity.edit">{{commodity.GPU}}</p>
              <b-form-textarea v-else v-model="GPU"></b-form-textarea>
              <h3>庫存</h3>
              <p v-if="!commodity.edit">{{commodity.count}}</p>
              <b-form-textarea v-else v-model="count"></b-form-textarea>
            </b-card-text>
            <b-button  v-if="commodity.edit" variant="success" @click="update(commodity)" id="button">更新</b-button>
            <b-button v-else variant="success" @click="edit(commodity)" id="button">編輯</b-button>
            <b-button v-if="commodity.edit" variant="danger" @click="cancel(commodity)" id="button">取消</b-button>
            <b-button v-else variant="danger" @click="del(commodity, idx)" id="button">刪除</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

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
              src: process.env.VUE_APP_APIURL + '/commodity/' + response.data.image,
              edit: false
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
    edit (commodity) {
      commodity.edit = true
      this.name = commodity.name
      this.price = commodity.price
      this.Screen = commodity.Screen
      this.WorkingSystem = commodity.WorkingSystem
      this.CPU = commodity.CPU
      this.DRAM = commodity.DRAM
      this.HDD = commodity.HDD
      this.GPU = commodity.GPU
      this.count = commodity.count
    },
    cancel (commodity) {
      commodity.edit = false
      this.name = ''
      this.price = ''
      this.Screen = ''
      this.WorkingSystem = ''
      this.CPU = ''
      this.DRAM = ''
      this.HDD = ''
      this.GPU = ''
      this.count = ''
    },
    update (commodity) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/commodity/' + commodity._id, { name: this.name, price: this.price, Screen: this.Screen, WorkingSystem: this.WorkingSystem, CPU: this.CPU, DRAM: this.DRAM, HDD: this.HDD, GPU: this.GPU, count: this.count })
        .then(response => {
          commodity.edit = false
          commodity.name = this.name
          commodity.price = this.price
          commodity.Screen = this.Screen
          commodity.WorkingSystem = this.WorkingSystem
          commodity.CPU = this.CPU
          commodity.DRAM = this.DRAM
          commodity.HDD = this.HDD
          commodity.GPU = this.GPU
          commodity.count = this.count
          this.name = ''
          this.price = ''
          this.Screen = ''
          this.WorkingSystem = ''
          this.CPU = ''
          this.DRAM = ''
          this.HDD = ''
          this.GPU = ''
          this.count = ''
        })
        .catch(() => {
          alert('發生錯誤')
        })
    },
    del (commodity, idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/commodity/' + commodity._id)
        .then(response => {
          this.commoditys.splice(idx, 1)
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
            src: process.env.VUE_APP_APIURL + '/commodity/' + d.image,
            edit: false
          }
        })
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }
}
</script>
