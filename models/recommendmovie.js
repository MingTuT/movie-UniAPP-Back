const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const recommendMovieSchema = new Schema({
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
  brief: {
    type: String,
    require: true
  }
})

const RecommendMovie = mongoose.model('RecommendMovie', recommendMovieSchema)
module.exports = RecommendMovie