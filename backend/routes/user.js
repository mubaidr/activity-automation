const express = require('express')

const router = express.Router({ caseSensitive: true })
const bcrypt = require('bcryptjs')
const validator = require('validator')

router.post('/', (req, res, next) => {
  const token = req.headers['x-access-token']
  const db = req.app.get('db')
  const { username, password, name } = req.body
  const user = req.account
  let updateOptions

  if (
    username &&
    validator.isLength(username, {
      min: 3,
      max: 16
    })
  ) {
    updateOptions = {
      username
    }

    user.username = username
  } else if (
    name &&
    validator.isLength(name, {
      min: 3,
      max: 255
    })
  ) {
    updateOptions = { name }

    user.name = name
  } else if (
    password &&
    validator.isLength(password, {
      min: 8,
      max: 16
    })
  ) {
    const hashedPassword = bcrypt.hashSync(password, 8)
    updateOptions = { password: hashedPassword }
  } else {
    res.sendStatus(400)
    return
  }

  db.login
    .update(updateOptions, {
      where: {
        id: user.id
      }
    })
    .then(() => {
      // Update client side info
      res.json({
        token,
        login: user
      })
    })
    .catch(next)
})

module.exports = router
