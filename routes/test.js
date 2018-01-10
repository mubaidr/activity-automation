const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/', (req, res) => {
  res.send('test')
})

router.post('/', (req, res) => {
  res.send(`test: ${req.body}`)
})

module.exports = router
