const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const carouselSchema = new Schema({
  movieId: {
    type: String,
    require: true
  },
  imgPath: {
    type: String,
    require: true
  }
})

const Carousel = mongoose.model('Carousel', carouselSchema)
module.exports = Carousel