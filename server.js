import React from 'react'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'

const app = express()

if(process.env.NODE_ENV === "development") {
  require('./webpack')(app)
}

app.set("views", path.resolve('views'))
app.set('view engine', 'ejs')

app.use('/build', express.static(path.resolve('build')))
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.render('index', {
    isProduction: process.env.NODE_ENV === 'production'
  })
})

app.listen(3000, 'localhost', (err) => {
  if(err) 
    return console.log(err)
  
  console.log('Listening at http://localhost:3000')
})