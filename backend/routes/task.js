const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('task')
})

router.post('/', (req, res) => {
  res.send(`task: ${req.body}`)
})

module.exports = router
