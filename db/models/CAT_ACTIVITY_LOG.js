/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catActivityLog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_ACTIVITY',
        key: 'ID'
      },
      field: 'ACTIVITY_ID'
    },
    loginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_LOGIN',
        key: 'ID'
      },
      field: 'LOGIN_ID'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time'
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REMARKS'
    },
  }, {
    tableName: 'CAT_ACTIVITY_LOG',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
