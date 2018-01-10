/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catTestLocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    abbriv: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ABBRIV'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'ADDRESS'
    },
    testCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_TEST_CENTRE',
        key: 'ID'
      },
      field: 'TEST_CENTRE_ID'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CAPACITY'
    },
  }, {
    tableName: 'CAT_TEST_LOCATION',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
