const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const hotMovieSchema = new Schema({
  movieId: {
    type: String,
    require: true
  },
  posterPath: {
    type: String,
    require: true
  },
  movieName: {
    type: String,
    require: true
  },
  score: {
    type: Number,
    require: true
  }
})

const HotMovie = mongoose.model('HotMovie', hotMovieSchema)
module.exports = HotMovie