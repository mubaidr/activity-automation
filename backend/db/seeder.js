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
        if (callback) callback()
      })
  }
}
