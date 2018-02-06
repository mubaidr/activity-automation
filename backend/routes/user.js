const express = require('express')

const router = express.Router({ caseSensitive: true })
const bcrypt = require('bcryptjs')
const validator = require('validator')

router.post('/', (req, res, next) => {
  const token = req.headers['x-access-token']
  const db = req.app.get('db')
  const { username, password } = req.body
  const user = req.account
  let updateOptions

  // TODO: test name update

  if (
    username &&
    validator.isLength(password, {
      min: 3,
      max: 16
    })
  ) {
    updateOptions = {
      username
    }
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
      // return updated user details
      user.username = username

      // Update client side info
      res.json({
        token,
        login: user
      })
    })
    .catch(next)
})

module.exports = router
