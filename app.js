const path = require('path')
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser');/*post方法*/



const app = express()
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));

// 跨域访问
app.all('*',function (req,res,next) {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS')
  next()
})


app.use(router)


// 开放静态资源访问
app.use('/public', express.static(path.join(__dirname, 'public')))




app.listen(3000, () => {
  console.log("127.0.0.1:3000")
})