const bcrypt = require('bcryptjs')

// loads dummy data
function addDemoData (models) {
  // login
  models.login.bulkCreate([
    {
      username: 'tim',
      password: bcrypt.hashSync('tim-password', 8),
      accountTypeId: 1
    },
    {
      username: 'mark',
      password: bcrypt.hashSync('mark-password', 8),
      accountTypeId: 2
    }
  ])
}

module.exports = {
  seed (models, callback) {
    // Account Types
    models.accountType
      .findAndCountAll({
        where: {
          id: [1, 2]
        }
      })
      .then(res => {
        if (res.count === 0) {
          models.accountType
            .bulkCreate([
              {
                id: 1,
                description: 'user'
              },
              {
                id: 2,
                description: 'admin'
              }
            ])
            .then(() => {
              addDemoData(models)
            })
        } else {
          addDemoData(models)
        }
      })

    if (callback) callback()
  }
}
