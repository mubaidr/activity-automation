const express = require('express')

const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const validator = require('validator')

router.post('/auth/register', (req, res, next) => {
  const db = req.app.get('db')
  const newUser = db.login.build(req.body)

  if (
    !newUser.username ||
    !newUser.password ||
    !validator.isLength(newUser.password, {
      min: 6,
      max: 16
    })
  ) {
    res.sendStatus(400)
    return
  }

  newUser.password = bcrypt.hashSync(newUser.password, 8)

  db.login
    .findOne({
      where: {
        username: newUser.username
      }
    })
    .then(user => {
      if (user) {
        res.sendStatus(409)
        return
      }

      newUser
        .save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })
})

router.post('/auth/login', (req, res, next) => {
  const db = req.app.get('db')

  const { username, password } = req.body

  if (
    !username ||
    !password ||
    !validator.isLength(password, {
      min: 6,
      max: 16
    })
  ) {
    res.sendStatus(400)
    return
  }

  db.login
    .findOne({
      where: {
        username
      },
      include: [db.accountType]
    })
    .then(user => {
      if (!user) {
        res.sendStatus(401)
        return
      }

      bcrypt.compare(password, user.password, (err, isMatched) => {
        if (err) next(err)
        if (!isMatched) {
          res.sendStatus(401)
          return
        }

        // confidential data should not be sent to client
        const tmpUser = user.get({ plain: true })
        delete tmpUser.password

        // signin
        jwt.sign(
          {
            iss: config.get('options.iss') || 'iss-not-specified',
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: tmpUser
          },
          config.get('options.secret'),
          // eslint-disable-next-line
          (err, token) => {
            if (err) next(err)

            res.json({
              token,
              login: tmpUser
            })
          }
        )
      })
    })
    .catch(next)
})

router.use('/api/*', (req, res, next) => {
  const token = req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.get('options.secret'), (err, payload) => {
      if (err) {
        res.sendStatus(401)
        return
      }

      req.account = payload.data
      next()
    })
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
