const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  const db = req.app.get('db')
  const login = req.account

  db.activity
    .findAll({
      where: {
        loginId: login.id
      },
      include: [db.login]
    })
    .then(activities => {
      console.log(activities)

      res.send('activity')
    })
})

router.post('/', (req, res) => {
  res.send(`activity: ${req.body}`)
})

module.exports = router
