const express = require('express')

const router = express.Router()

const test = require('./test')
const authentication = require('./authentication')
const task = require('./task')

router.use('/test', test)
router.use('/', authentication)
router.use('/api/task', task)

module.exports = router
