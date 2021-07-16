const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const niceMovieSchema = new Schema({
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

const NiceMovie = mongoose.model('NiceMovie', niceMovieSchema)
module.exports = NiceMovie