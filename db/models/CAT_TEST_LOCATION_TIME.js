/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catTestLocationTime', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    testLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_TEST_LOCATION',
        key: 'ID'
      },
      field: 'TEST_LOCATION_ID'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'TIME'
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'AVAILABLE'
    },
  }, {
    tableName: 'CAT_TEST_LOCATION_TIME',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
