const express = require('express')

const router = express.Router()

const authentication = require('./authentication')
const user = require('./user.js')
const activity = require('./activity')

router.use('/', authentication)
router.use('/api/user', user)
router.use('/api/activity', activity)

module.exports = router
