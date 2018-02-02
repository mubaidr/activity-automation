const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  const db = req.app.get('db')

  db.activityStatus
    .findAll()
    .then(activityStatus => {
      res.send(activityStatus)
    })
    .catch(next)
})

module.exports = router
