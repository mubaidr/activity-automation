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
      week: {
        type: DataTypes.STRING,
        allowNull: false
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
