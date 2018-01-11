const express = require('express')

const router = express.Router()

const test = require('./test')
const authentication = require('./authentication')
const task = require('./task')

router.use('/test', test)
router.use('/', authentication)
router.use('/task', task)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
