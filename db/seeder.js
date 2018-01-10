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
        if (res.count < 2) {
          models.accountType.bulkCreate([
            {
              id: 1,
              description: 'User'
            },
            {
              id: 2,
              description: 'Admin'
            }
          ])
        }
      })

    // Marital Status
    models.maritalStatus
      .findAndCountAll({
        where: {
          id: [1, 2]
        }
      })
      .then(res => {
        if (res.count < 2) {
          models.maritalStatus.bulkCreate([
            {
              id: 1,
              description: 'Single'
            },
            {
              id: 2,
              description: 'Married'
            }
          ])
        }
      })

    // Marital Status
    models.gender
      .findAndCountAll({
        where: {
          id: [1, 2, 3]
        }
      })
      .then(res => {
        if (res.count < 3) {
          models.gender.bulkCreate([
            {
              id: 1,
              description: 'Male'
            },
            {
              id: 2,
              description: 'Female'
            },
            {
              id: 3,
              description: 'Other'
            }
          ])
        }
      })

    // Religion
    models.religion
      .findAndCountAll({
        where: {
          id: [1, 2, 3, 4, 5, 6, 7]
        }
      })
      .then(res => {
        if (res.count < 7) {
          models.religion.bulkCreate([
            {
              id: 1,
              description: 'Islam'
            },
            {
              id: 2,
              description: 'Christianity'
            },
            {
              id: 3,
              description: 'Ahmadi'
            },
            {
              id: 4,
              description: 'Hindu'
            },
            {
              id: 5,
              description: 'Sikh'
            },
            {
              id: 6,
              description: 'Parsi'
            },
            {
              id: 7,
              description: 'Other'
            }
          ])
        }
      })

    if (callback) callback()
  }
}
