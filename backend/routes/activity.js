const express = require('express')

const router = express.Router()

router.delete('/', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account

  db.activity
    .destroy({
      where: {
        id: req.query.id,
        loginId: login.id
      }
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account
  const whereQuery = req.query.time
    ? {
        time: req.query.time,
        loginId: login.id
      }
    : {
        loginId: login.id
      }

  db.activity
    .findAll({
      where: whereQuery
    })
    .then(activities => {
      res.send(activities)
    })
    .catch(next)
})

router.get('/all', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account

  // TODO: get all activities for all users from current week

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

  const { id, description } = req.body

  if (!description.trim()) {
    res.sendStatus(400)
  }

  if (!id) {
    db.activity
      .build({
        ...req.body,
        loginId: login.id
      })
      .save()
      .then(() => {
        res.sendStatus(200)
      })
      .catch(next)
  } else {
    db.activity
      .upsert(
        {
          ...req.body,
          loginId: login.id
        },
        {
          id
        }
      )
      .then(() => {
        res.sendStatus(200)
      })
      .catch(next)
  }
})

module.exports = router
