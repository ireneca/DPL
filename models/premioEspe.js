'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PremioEspeSchema = Schema({
  premio: String,
  imagen: String,
  nombre: String
})
module.exports = mongoose.model('PremioEspe',PremioEspeSchema)
