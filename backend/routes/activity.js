const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account

  db.activity
    .findAll({
      where: {
        loginId: login.id
      },
      include: [db.login],
      raw: true
    })
    .then(activities => {
      res.send(activities)
    })
    .catch(next)
})

router.get('/all', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account

  if (login.accountType.description === 'user') {
    res.send(401)
    return
  }

  db.activity
    .findAll({
      include: [db.login],
      raw: true
    })
    .then(activities => {
      res.send(activities)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account
  const activity = db.activity.build({ ...req.body, loginId: login.id })

  activity
    .create()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

module.exports = router
