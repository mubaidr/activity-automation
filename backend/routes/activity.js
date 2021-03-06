const express = require('express')
const Sequelize = require('sequelize')
const officegen = require('officegen')

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
      include: [db.login, db.activityStatus]
    })
    .then(activities => {
      res.set(
        'Content-Type',
        // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        'application/octet-stream'
      )

      // Generate word document
      const docx = officegen({
        type: 'docx',
        subject: 'Report',
        keywords: 'Activity, Report',
        description: 'Auto-generated'
      })

      // header
      const header = docx.getHeader().createP()
      header.options.align = 'center'
      header.addText('Activity Report', { font_size: 24 })
      header.addLineBreak()
      header.addText(`${startDate} to ${endDate}`, { font_size: 18 })

      // table header
      const table = [
        [
          { val: 'Day', opts: { b: true } },
          { val: 'Activity', opts: { b: true } }
        ]
      ]

      if (!options.isAggregated) {
        activities.forEach(activity => {
          table.push([new Date(activity.time).getDay(), activity.description])
        })
      } else {
        activities
          .map(item => item.login.id)
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .forEach((item, index) => {
            activities
              .filter(activity => activity.login.id === item)
              .forEach(activity => {
                table.push([
                  new Date(activity.time).getDay(),
                  activity.description
                ])
              })

            if (index > 0) {
              docx.putPageBreak()
            }
          })
      }

      // load table with style
      docx.createTable(table, {
        tableAlign: 'left',
        tableFontFamily: 'Calibri',
        borders: true,
        tableColWidth: 4261,
        tableSize: 24
      })

      // footer
      const footer = docx.getFooter().createP()
      footer.options.align = 'center'
      footer.addText(new Date().toUTCString(), { font_size: 16 })

      // output stream
      docx.generate(res)
    })
    .catch(next)
})

module.exports = router
