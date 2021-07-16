const express = require('express')
const Carousel = require('./models/carousel')
const HotMovie = require('./models/hotmovie')
const NiceMovie = require('./models/nicemovie')
const RecommendMovie = require('./models/recommendmovie')
const Movie = require('./models/movie')
const User = require('./models/user')
const multiparty = require('multiparty')

const router = express.Router()

/* ==================== 首页数据 ==================== */
// 请求轮播图数据
router.get('/carousel', async (req, res) => {
  try {
    const carousel = await Carousel.find({})
    return res.status(200).json({
      carousel
    })
  } catch (e) {
    throw e
  }
})

//请求热门视频数据
router.get('/hot', async (req, res) => {
  try {
    const hotMovie = await HotMovie.find({})
    return res.status(200).json({
      hotMovie
    })
  } catch (e) {
    throw e
  }
})

// 请求口碑电影数据
router.get('/nice', async (req, res) => {
  try {
    const niceMovie = await NiceMovie.find({})
    return res.status(200).json({
      niceMovie
    })
  } catch (e) {
    throw e
  }
})

// 请求推荐电影数据
router.get('/recommend', async (req, res) => {
  try {
    const recommendMovie = await RecommendMovie.find({})
    return res.status(200).json({
      recommendMovie
    })
  } catch (e) {
    throw e
  }
})

/* ==================== 详情页数据数据 ==================== */
router.get('/movie', async (req, res) => {
  try {
    const id = req.query.id
    const movie = await Movie.findOne({ _id: id })
    return res.status(200).json({
      movie
    })
  } catch (e) {
    throw e
  }
})

/* ==================== 搜索页数据数据 ==================== */
// 随机推荐电影
router.get('/random', async (req, res) => {
  try {
    const movie = await Movie.aggregate([{ $sample: { size: 9 } }])
    return res.status(200).json({
      movie
    })
  } catch (e) {
    throw e
  }
})

// 搜索关键字获取电影数据
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword
    let regexp = new RegExp(keyword, 'i')
    // 关键关键字模糊查询
    const movie = await Movie.find(
      {
        $or: [
          { movieName: { $regex: regexp } }
        ]
      }
    )
    return res.status(200).json({
      movie
    })
  } catch (e) {
    throw e
  }
})


/* ==================== 我的数据数据 ==================== */
// 注册
router.post('/register', async (req, res) => {
  try {
    const body = req.body
    // let check = await User().findOne({ email: body.email })
    // console.log(check)

    const user = await new User(body).save()
    return res.status(200).json({
      user
    })
  } catch (e) {
    return res.status(200).json({
      msg_code: 'error',
    })
    throw e
  }
})

// 登录
router.post('/login', async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne({ email: body.email })

    if (user) {
      if (user.password == body.password) {
        return res.status(200).json({
          msg_code: 'ok',
          user
        })
      } else {
        return res.status(200).json({
          msg_code: 'error',
        })
      }
    } else {
      return res.status(200).json({
        msg_code: 'error',
      })
    }
  } catch (e) {
    throw e
  }
})

// 修改资料
router.post('/setting', async (req, res) => {
  try {
    const info = req.body

    var form = new multiparty.Form()
    form.uploadDir='./public/user/avatar'; //上传图片保存的地址 目录必须存在
    form.parse(req, async function(err, fields, files) {
      if(fields == undefined) {
        await User.updateOne({
          _id: info._id
        },{
          $set:{ "nickName": info.nickName, "sex": info.sex, "signature": info.signature }
        })
        let user = await User.findOne({ _id: info._id })
        return res.status(200).json({
          user
        })
      }else {
        let avatar = "http://127.0.0.1:3000/" + files.file[0].path
        avatar = avatar.replace(/\\/g,"/")
        await User.updateOne({
          _id: fields._id
        },{
          $set:{ "nickName": fields.nickName[0], "sex": fields.sex[0], "signature": fields.signature[0], "avatar": avatar }
        })
        let user = await User.findOne({ _id: fields._id })
        return res.status(200).json({
          user
        })
      }
    })
  } catch (e) {
    throw e
  }
})





module.exports = router


