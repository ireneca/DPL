'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Pelicula = require('./models/pelicula')
const Premio = require('./models/premio')
const PremioEspe = require('./models/premioEspe')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//--------get
app.get('/api/pelicula', (req,res)=>{
  Pelicula.find({},(err,peliculas)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!peliculas) return res.status(404).send({message: `No existe`})

    res.status(200).send({peliculas})
  })
})
app.get('/api/pelicula/:peliculaId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!pelicula) return res.status(404).send({message: `No existe`})

    res.status(200).send({pelicula})
  })
})
app.get('/api/pelicula/:peliculaId/premio', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!pelicula) return res.status(404).send({message: `No existe`})

    res.status(200).send({premios: pelicula.premio})
  })
})
app.get('/api/pelicula/:peliculaId/premio/:premioId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!pelicula) return res.status(404).send({message: `No existe`})
    let premioId = req.params.premioId
    pelicula.premio.findById(premioId, (err,premio)=>{
      if(err) return res.status(500).send({message: `Error peticion: ${err}`})
      if(!premio) return res.status(404).send({message: `No existe`})

      res.status(200).send({premio})
    })
  })
})
app.get('/api/premioEspe', (req,res)=>{
  PremioEspe.find({},(err,premioEspe)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!premioEspe) return res.status(404).send({message: `No existe`})

    res.status(200).send({premios_especiales: premioEspe})
  })
})
app.get('/api/premioEspe/:premioEspeId', (req,res)=>{
  let premioEspeId = req.params.premioEspeId
  PremioEspe.findById(premioEspeId, (err,premioEspe)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    if(!premioEspe) return res.status(404).send({message: `No existe`})

    res.status(200).send({premios_especiales: premioEspe})
  })
})
//--------post
app.post('/api/pelicula', (req,res)=>{
  console.log('POST /api/pelicula')
  console.log(req.body)

  let pelicula = new Pelicula()
  pelicula.titulo = req.body.titulo
  pelicula.imagen = req.body.imagen

  pelicula.save((err,peliculaAlmacenada)=>{
    if(err)res.status(500).send({message: `Error guardar BD: ${err}`})

    res.status(200).send({pelicula: peliculaAlmacenada})
  })
})
app.post('/api/pelicula/:peliculaId/premio', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error peticion: ${err}`})
    console.log(`POST /api/pelicula/${peliculaId}/premio`)
    console.log(req.body)

    let premio = new Premio()
    premio.nombre = req.body.nombre
    premio.imagen = req.body.imagen,
    premio.categoria = req.body.categoria,
    premio.recoge = req.body.recoge,
    premio.gana = req.body.gana

    pelicula.premio[pelicula.premio.length] = premio

    pelicula.save((err,peliculaAlmacenada)=>{
      if(err)res.status(500).send({message: `Error guardar BD: ${err}`})

      res.status(200).send({pelicula: peliculaAlmacenada})
    })
  })
})
app.post('/api/premioEspe', (req,res)=>{
  console.log('POST /api/premioEspe')
  console.log(req.body)

  let premioEspe = new PremioEspe()
  premioEspe.premio = req.body.premio
  premioEspe.imagen = req.body.imagen
  premioEspe.nombre = req.body.nombre

  premioEspe.save((err,premioEspeAlmacenado)=>{
    if(err)res.status(500).send({message: `Error guardar BD: ${err}`})

    res.status(200).send({premios_especiales: premioEspeAlmacenado})
  })
})
//--------put
app.put('/api/pelicula/:peliculaId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  let update = req.body

  Pelicula.findByIdAndUpdate(peliculaId, update, (err, peliculaUpdated)=>{
    if(err) return res.status(500).send({message: `Error actualizar: ${err}`})
    res.status(200).send({pelicula: peliculaUpdated})
  })
})
app.put('/api/pelicula/:peliculaId/premio/:premioId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  let update = req.body

  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error actualizar: ${err}`})
    let premioId = req.params.premioId
    pelicula.premio.findByIdAndUpdate(premioId, update, (err,premioUpdate)=>{
      if(err) return res.status(500).send({message: `Error actualizar: ${err}`})
      res.status(200).send({premio: premioUpdate})
    })
  })
})
app.put('/api/premioEspe/:premioEspeId', (req,res)=>{
  let premioEspeId = req.params.premioEspeId
  let update = req.body

  PremioEspe.findByIdAndUpdate(premioEspeId, update, (err, premioEspeUpdated)=>{
    if(err) return res.status(500).send({message: `Error actualizar: ${err}`})
    res.status(200).send({premios_especiales: premioEspeUpdated})
  })
})
//--------delete
app.delete('/api/pelicula/:peliculaId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error borrar: ${err}`})

    pelicula.remove(err => {
      if(err) return res.status(500).send({message: `Error borrar: ${err}`})
      res.status(200).send({message: `borrardo correctamente`})
    })
  })
})
app.delete('/api/pelicula/:peliculaId/premio/:premioId', (req,res)=>{
  let peliculaId = req.params.peliculaId
  Pelicula.findById(peliculaId, (err,pelicula)=>{
    if(err) return res.status(500).send({message: `Error borrar: ${err}`})
    let premioId = req.params.premioId
    pelicula.premio.findById(premioId, (err,premio)=>{
      if(err) return res.status(500).send({message: `Error borrar: ${err}`})

      premio.remove(err => {
        if(err) return res.status(500).send({message: `Error borrar: ${err}`})
        res.status(200).send({message: `borrardo correctamente`})
      })
    })
  })
})
app.delete('/api/premioEspe/:premioEspeId', (req,res)=>{
  let premioEspeId = req.params.premioEspeId
  PremioEspe.findById(premioEspeId, (err,premioEspe)=>{
    if(err) return res.status(500).send({message: `Error borrar: ${err}`})

    premioEspe.remove(err => {
      if(err) return res.status(500).send({message: `Error borrar: ${err}`})
      res.status(200).send({message: `borrardo correctamente`})
    })
  })
})

mongoose.connect('mongodb://localhost:27017/proyecto', (err,res)=>{
  if(err){
    return console.log(`error conectar bd: ${err}`);
  }
  console.log('coneccion bd')
  app.listen(port, () => {
    console.log('API REST')
  })
})
