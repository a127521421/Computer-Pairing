// 資料庫套件
import mongoose from 'mongoose'
// 環境套件
import dotenv from 'dotenv'
// 讓 mongoose 支援 unique 錯誤訊息
import beautifyUnique from 'mongoose-beautiful-unique-validation'
// 驗證
import validator from 'validator'

// 啟動環境
dotenv.config()

const Schema = mongoose.Schema

// 連線到本機的 mongodb 的 ComputerPairing 資料庫
mongoose.connect(process.env.DBURL)
// 使用插件
mongoose.plugin(beautifyUnique)

// 會員資料
const userSchema = new Schema({
  // 帳號
  account: {
    type: String,
    minlength: [4, '帳號必須四個字以上'],
    maxlength: [20, '帳號必須二十個字以下'],
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  // 密碼
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  // 電子郵件
  email: {
    type: String,
    require: [true, '信箱必填'],
    // 自訂驗證規則
    validata: {
      // 驗證 function
      validata (value) {
        // 使用驗證套件檢查是不是 email
        return validator.isEmail(value)
      },
      // 錯誤訊息
      message: '信箱格式錯誤'
    }
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
  description: {
    type: String,
    minlength: [2, '商品說明至少兩個字'],
    required: [true, '商品說明必填']
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

const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const commodity = mongoose.model(process.env.COLLECTION_COMMODITY, commoditySchema)
const carousel = mongoose.model(process.env.COLLECTION_CAROUSEL, CarouselSchema)
const connection = mongoose.connection

export default {
  users,
  commodity,
  carousel,
  connection
}
