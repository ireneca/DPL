'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PremioSchema = Schema({
  nombre: String,
  imagen: String,
  categoria: String,
  recoge: String,
  gana: Boolean
})

module.exports = mongoose.model('Premio',PremioSchema)
