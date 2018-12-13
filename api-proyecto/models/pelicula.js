'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PeliculaSchema = Schema({
  titulo: String,
  imagen: String,
  premio: [{
    nombre: String,
    imagen: String,
    categoria: String,
    recoge: String,
    gana: Boolean
  }]
})
module.exports = mongoose.model('Pelicula',PeliculaSchema)
