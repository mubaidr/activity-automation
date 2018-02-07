const express = require('express')
const Sequelize = require('sequelize')

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
      where: whereQuery,
      include: [db.activityStatus]
    })
    .then(activities => {
      res.send(activities)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account

  const { id, description, activityStatusId, time } = req.body

  if (!description.trim()) {
    res.sendStatus(400)
  }

  if (!id) {
    db.activity
      .build({
        description,
        activityStatusId: activityStatusId || 2,
        time,
        loginId: login.id
      })
      .save()
      .then(() => {
        res.sendStatus(200)
      })
      .catch(next)
  } else {
    db.activity
      .upsert({
        id,
        description,
        activityStatusId: activityStatusId || 2,
        time,
        loginId: login.id
      })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(next)
  }
})

router.get('/report', (req, res, next) => {
  const db = req.app.get('db')
  const login = req.account
  const options = JSON.parse(req.query.options)
  const { Op } = Sequelize

  const startDate = options.year
    ? `01-01-${options.year}`
    : options.range.split('to')[0].trim()
  const endDate = options.year
    ? `12-31-${options.year}`
    : options.range.split('to')[1].trim()

  if (
    login.accountType.description.toLowerCase() === 'user' &&
    options.isAggregated
  ) {
    res.send(401)
    return
  }

  const whereOptions = {
    time: {
      [Op.and]: {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate)
      }
    }
  }

  if (!options.isAggregated) {
    whereOptions.loginId = login.id
  }

  db.activity
    .findAll({
      whereOptions,
      include: [db.login, db.activityStatus],
      raw: true
    })
    .then(activities => {
      // TODO: generate report
      res.send(activities)
    })
    .catch(next)
})

module.exports = router
