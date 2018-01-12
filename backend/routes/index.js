const express = require('express')

const router = express.Router()

const test = require('./test')
const authentication = require('./authentication')
const activity = require('./activity')

router.use('/test', test)
router.use('/', authentication)
router.use('/api/activity', activity)

module.exports = router
