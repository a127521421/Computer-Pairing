// 資料庫套件
import mongoose from 'mongoose'
// 環境套件
import dotenv from 'dotenv'
// 讓 mongoose 支援 unique 錯誤訊息
import beautifyUnique from 'mongoose-beautiful-unique-validation'
// 驗證
// import validator from 'validator'

// 啟動環境
dotenv.config()

const Schema = mongoose.Schema

// (因警告而新增)
mongoose.set('useCreateIndex', true)
// (因警告而新增)
mongoose.set('useFindAndModify', false)
// 連線到本機的 mongodb 的 ComputerPairing 資料庫 (因警告而新增)
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
// 使用插件
mongoose.plugin(beautifyUnique)

// 會員資料
const userSchema = new Schema({
  // 帳號
  account: {
    type: String,
    minlength: [4, '帳號必須四個字以上，二十個字以下'],
    maxlength: [20, '帳號必須四個字以上，二十個字以下'],
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  // 密碼
  password: {
    type: String,
    minlength: [4, '密碼必須四個字以上，二十個字以下'],
    maxlength: [20, '密碼必須四個字以上，二十個字以下'],
    required: [true, '請輸入密碼']
  }
}, {
  // 不要紀錄資料修改次數
  versionKey: false
})

// 商品(管理員)
const commoditySchema = new Schema({
  // 商品名稱
  name: {
    type: String,
    minlength: [2, '商品名稱至少兩個字'],
    // required 才是正確的，須改
    required: [true, '商品名稱必填']
  },
  // 價格
  price: {
    type: Number,
    min: [0, '商品價格最小 0 元'],
    required: [true, '商品價格必填']
  },
  // 商品說明
  // 螢幕
  Screen: {
    type: String,
    minlength: [2, '螢幕至少兩個字']
  },
  // 作業系統
  WorkingSystem: {
    type: String,
    minlength: [2, '作業系統至少兩個字'],
    required: [true, '作業系統必填']
  },
  // CPU
  CPU: {
    type: String,
    minlength: [2, 'CPU至少兩個字'],
    required: [true, 'CPU必填']
  },
  // DRAM
  DRAM: {
    type: String,
    minlength: [2, 'DRAM至少兩個字'],
    required: [true, 'DRAM必填']
  },
  // HDD
  HDD: {
    type: String,
    minlength: [2, 'HDD至少兩個字'],
    required: [true, 'HDD必填']
  },
  // GPU
  GPU: {
    type: String,
    minlength: [2, 'GPU至少兩個字'],
    required: [true, 'GPU必填']
  },
  // 庫存
  count: {
    type: Number,
    min: [0, '商品庫存最少 0 個'],
    required: [true, '商品庫存必填']
  },
  // 圖片
  image: {
    type: String,
    required: [true, '商品圖片必需要有']
  }
}, {
  versionKey: false
})

// 輪播圖
const CarouselSchema = new Schema({
  image: {
    type: String,
    required: [true, '商品圖片必需要有']
  }
})

// 願望清單
const CarouselWishlist = new Schema({
  user: {
    type: String,
    required: [true, '沒有使用者名稱']
  },
  wishlist: {
    type: String,
    required: [true, '沒有願望清單']
  }
}, {
  versionKey: false
})

const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const commodity = mongoose.model(process.env.COLLECTION_COMMODITY, commoditySchema)
const carousel = mongoose.model(process.env.COLLECTION_CAROUSEL, CarouselSchema)
const wishlist = mongoose.model(process.env.COLLECTION_WISHLIST, CarouselWishlist)
const connection = mongoose.connection

export default {
  users,
  commodity,
  carousel,
  wishlist,
  connection
}
