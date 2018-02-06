const express = require('express')

const router = express.Router()

const authentication = require('./authentication')
const user = require('./user.js')
const activity = require('./activity')
const activityStatus = require('./activityStatus')
const report = require('./report.js')

router.use('/', authentication)
router.use('/api/user', user)
router.use('/api/activity', activity)
router.use('/api/activityStatus', activityStatus)
router.use('/api/report', report)

module.exports = router
