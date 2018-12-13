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

const PeliculaSchema = Schema({
  titulo: String,
  imagen: String,
  premio: [PremioSchema]
})
module.exports = mongoose.model('Pelicula',PeliculaSchema)
