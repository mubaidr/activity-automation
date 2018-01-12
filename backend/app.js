const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index')

const app = express()
const { models, sequelize } = require('./db/index')

// kepp root path in global
global.app_root = __dirname

// Setup DB and store models in app
app.set('db', models)
app.set('sequelize', sequelize)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  // return error
  console.error(`${err.message} \n ${err.stack}`)
  res.sendStatus(err.status || 500)
})

module.exports = app
