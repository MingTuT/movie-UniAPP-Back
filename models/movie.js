const mongoose = require('mongoose')
const db = require('./db')
const Schema = mongoose.Schema
const movieSchema = new Schema({
  trailer: {
    type: Array,
    require: true
  },
  relatedPic: {
    type: Array,
    require: true
  },
  movieName: {
    type: String,
    require: true
  },
  posterPath: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  language: {
    type: String,
    require: true
  },
  releaseDate: {
    type: String,
    require: true
  },
  score: {
    type: Number,
    require: true
  },
  brief:{
    type: String,
    require: true
  }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie