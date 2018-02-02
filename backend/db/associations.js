module.exports = {
  associate: models => {
    models.login.belongsTo(models.accountType)
    models.activity.belongsTo(models.login)
    models.activity.belongsTo(models.activityStatus)
  }
}
