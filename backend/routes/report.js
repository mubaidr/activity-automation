const express = require('express')

const router = express.Router()

router.get('/weekly', (req, res, next) => {
  // const db = req.app.get('db')

  res.send('get: Reports api')
})

module.exports = router
