module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        deault: Date.now()
      }
    },
    {
      timestamps: true,
      underscored: false,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: false
    }
  )
