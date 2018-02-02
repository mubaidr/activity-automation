function addAccountTypes(models) {
  models.accountType
    .findAndCountAll({
      where: {
        id: [1, 2]
      }
    })
    .then(res => {
      if (res.count !== 2) {
        models.accountType.bulkCreate([
          {
            id: 1,
            description: 'user'
          },
          {
            id: 2,
            description: 'admin'
          }
        ])
      }
    })
}

function addActivityStatus(models) {
  models.activityStatus
    .findAndCountAll({
      where: {
        id: [1, 2]
      }
    })
    .then(res => {
      if (res.count !== 2) {
        models.activityStatus.bulkCreate([
          {
            id: 1,
            description: 'In-Progress'
          },
          {
            id: 2,
            description: 'Completed'
          },
          {
            id: 3,
            description: 'Routine'
          }
        ])
      }
    })
}

module.exports = {
  seed(models, callback) {
    // Account Types
    addAccountTypes(models)
    // Activity status
    addActivityStatus(models)

    if (callback) callback()
  }
}
