const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const userSchema = new Schema({
  nickName: {
    type: String,
    default: "User"
  },
  avatar: {
    type: String,
    default: "http://127.0.0.1:3000/public/user/avatar/avatar-default.png"
  },
  sex: {
    type: Number,
    default: 1
  },
  signature: {
    type: String,
    default: "空空如也~"
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User