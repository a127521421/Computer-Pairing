// 網頁伺服器
import express from 'express'
// 讓 express 可以讀取 post 資料
import bodyParser from 'body-parser'
// MD5 加密
import md5 from 'md5'
// 檔案上傳套件
import multer from 'multer'
// Nodejs 預設的路徑套件
import path from 'path'
// Nodejs 預設的檔案套件
import fs from 'fs'
// Express 處理跨網域要求
import cors from 'cors'
// 登入狀態
import session from 'express-session'
// 將登入狀態存入資料庫
import connectMongo from 'connect-mongo'
// 將檔案傳至FTP
import FTPStorage from 'multer-ftp'
// 環境套件
import dotenv from 'dotenv'
// request
import request from 'request'

import db from './db.js'

// 啟動環境
dotenv.config()

// 啟動登入狀態 + 將登入狀態存入資料庫
const MongoStore = connectMongo(session)

// 使用套件
const app = express()
// 讓 express 使用 body-parser，並把收到的資料轉 json
app.use(bodyParser.json())

// 設定跨域的請求
app.use(cors({
  // origin 來源網域
  // callback(錯誤, 是否允許)
  origin (origin, callback) {
    // 直接開網頁，不是 ajax 時，origin 是 undefined
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  // 是否允許認證資訊
  credentials: true
}))

// 設定登陸狀態
app.use(session({
  // 密鑰，加密認證資料用(可隨便亂打)
  secret: 'computer',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  // session 登入狀態有效毫秒
  cookie: {
    // 1000 毫秒 = 一秒鐘
    // 1000 毫秒 * 60 = 一分鐘
    // 1000 毫秒 * 60 * 30 = 三十分鐘
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未修改的 session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true,
  resave: true
}))

// 檔案上傳設定(位置)
// 需注意上傳到哪裡
let storage
if (process.env.FTP === 'true') {
  // heroku 將上傳檔案放伺服器
  storage = new FTPStorage({
    // 上傳伺服器的根目錄
    basepath: '/',
    // FTP 設定
    ftp: {
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, options.basepath + Date.now() + path.extname(file.originalname))
    }
  })
} else {
  // 開發環境將上傳檔案放本機
  storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'images/')
    },
    // 檔名
    filename (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
}
const upload = multer({
  storage,
  // 篩選文件
  fileFilter (req, file, cb) {
    // cb(錯誤訊息, 是否接受檔案)
    // 檔案類型有沒有包含 image 文字
    // mimetype 檔案類型
    // includes() 判断一个数组是否包含一个指定的值，如果是返回 true，否则false
    if (!file.mimetype.includes('image')) {
      // 觸發 multer 錯誤，不接受檔案
      // LIMIT_FORMAT 是自訂的錯誤 CODE，跟內建的錯誤 CODE 格式統一
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    // 上傳上限 1mb
    fileSize: 1024 * 1024
  }
})

// 註冊設定(前台)
app.post('/users', async (req, res) => {
  // 判斷是否為json格式
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  if (req.body.password.length < 4 || req.body.password.length > 20) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '密碼必須四個字以上，二十個字以下' })
    return
  }

  try {
    // 新增資料
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password)
    })
    res.status(200)
    res.send({ success: true, message: '註冊成功' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登入設定(前台)
app.post('/login', async (req, res) => {
  // 判斷是否為json格式
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    // 尋找資料
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )

    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: '登入成功', result: result[0] })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登出設定(前台)
app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '登出成功' })
    }
  })
})

// 修改密碼(會員後台)
app.patch('/usersupdate/:id', async (req, res) => {
  // 檢查是否有登錄
  // if (req.session.user === undefined) {
  //   res.status(401)
  //   res.send({ success: false, message: '未登入' })
  //   return
  // }
  // 拒絕不是 json 的資料格式
  if (!req.headers['content-type'].includes('application/json')) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  if (req.body.password.length < 4 || req.body.password.length > 20) {
    // 回傳錯誤狀態碼
    res.status(400)
    res.send({ success: false, message: '密碼必須四個字以上，二十個字以下' })
    return
  }
  try {
    // 尋找後修改
    // findByIdAndUpdate 預設回傳的是更新前的資料
    // 設定 new true 後會變成回傳新的資料
    await db.users.findByIdAndUpdate(req.params.id, { password: md5(req.body.password) }, { new: true })
    res.status(200)
    res.send({ success: true, message: '密碼修改成功' })
    return
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})

// 會員資料刪除(管理員後台)
app.delete('/usersupdate/:id', async (req, res) => {
  try {
    let result = ''
    result = await db.users.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '會員資料刪除成功' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 商品檔案上傳(管理員後台)
app.post('/commodity', async (req, res) => {
  // multipart 有包含檔案
  // form-data form 傳出的資料
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 有一個上傳進來的檔案，欄位是 image
  // req，進來的東西
  // res，要出去的東西
  // err，檔案上傳的錯誤
  // upload.single(欄位)(req, res, 上傳完畢的 function)
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let image = ''
        if (process.env.FTP === 'true') {
          image = path.basename(req.file.path)
        } else {
          image = req.file.filename
        }
        const result = await db.commodity.create(
          {
            name: req.body.name,
            price: req.body.price,
            Screen: req.body.Screen,
            WorkingSystem: req.body.WorkingSystem,
            CPU: req.body.CPU,
            DRAM: req.body.DRAM,
            HDD: req.body.HDD,
            GPU: req.body.GPU,
            count: req.body.count,
            image
          }
        )
        res.status(200)
        res.send({ success: true, message: '商品上傳成功', image, _id: result._id })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})

// 商品檔案修改(管理員後台)
app.patch('/commodity/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    // findByIdAndUpdate 預設回傳的是更新前的資料
    // 設定 new true 後會變成回傳新的資料
    await db.commodity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '商品修改成功' })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 商品檔案刪除(管理員後台)
app.delete('/commodity/:id', async (req, res) => {
  try {
    let result = ''
    result = await db.commodity.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '商品檔案刪除成功' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 商品檔案-找檔案資料(前台-目錄)
app.get('/commodity', async (req, res) => {
  try {
    const result = await db.commodity.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 商品檔案-找檔案資料(前台-商品)
app.get('/good/:id', async (req, res) => {
  try {
    const result = await db.commodity.findById(req.params.id)
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 商品檔案-給檔案(前台)
app.get('/commodity/:image', async (req, res) => {
  if (process.env.FTP === 'false') {
    const path = process.cwd() + '/images/' + req.params.image
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  } else {
    req.pipe(request('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.image)).pipe(res)
    // res.redirect('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.image)
  }
})

// 願望清單
app.post('/wishlist', async (req, res) => {
  // 判斷是否為json格式
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    // 新增資料
    const result = await db.wishlist.create({
      user: req.body.user,
      wishlist: req.body.wishlist
    })
    res.status(200)
    res.send({ success: true, message: '以加入願望清單', _id: result._id })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 移除願望清單
app.delete('/wishlist/:id', async (req, res) => {
  try {
    let result = ''
    result = await db.wishlist.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 找願望清單資料(會員後台-目錄)
app.get('/wishlist/:user', async (req, res) => {
  try {
    const result = await db.wishlist.find({ user: req.params.user })
    if (result.length > 0) {
      const result2 = []
      for (const w of result) {
        const result3 = await db.commodity.findById(w.wishlist)
        result2.push(result3)
      }
      res.status(200)
      res.send({ success: true, message: '', result2 })
    } else {
      res.send({ success: false })
    }
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 找願望清單資料(單獨)
app.post('/wishlistone/:user', async (req, res) => {
  try {
    const result = await db.wishlist.find({ user: req.params.user, wishlist: req.body.wishlist })
    if (result.length > 0) {
      res.status(200)
      res.send({ success: true, message: '', result })
    } else {
      res.send({ success: false })
    }
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 輪播圖上傳(管理員後台)
app.post('/carousel', async (req, res) => {
  // multipart 有包含檔案
  // form-data form 傳出的資料
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 有一個上傳進來的檔案，欄位是 image
  // req，進來的東西
  // res，要出去的東西
  // err，檔案上傳的錯誤
  // upload.single(欄位)(req, res, 上傳完畢的 function)
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符2'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let image = ''
        if (process.env.FTP === 'true') {
          image = path.basename(req.file.path)
        } else {
          image = req.file.filename
        }
        const result = await db.carousel.create(
          {
            image
          }
        )
        res.status(200)
        res.send({ success: true, message: '輪播圖上傳成功', image, _id: result._id })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})

// 輪播圖-找圖片資料(前台)
app.get('/carousel', async (req, res) => {
  try {
    const result = await db.carousel.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 輪播圖-給圖片檔(前台)
app.get('/carousel/:image', async (req, res) => {
  if (process.env.FTP === 'false') {
    const path = process.cwd() + '/images/' + req.params.image
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  } else {
    req.pipe(request('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.image)).pipe(res)
    // res.redirect('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.image)
  }
})

// 輪播圖刪除(管理員後台)
app.delete('/carousel/:id', async (req, res) => {
  try {
    let result = ''
    result = await db.carousel.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '輪播圖刪除成功' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 刷新登陸狀態(前台)
app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
})

// 監聽
app.listen(process.env.PORT, () => {
  console.log('已啟動')
  console.log('http://localhost:3000')
})
