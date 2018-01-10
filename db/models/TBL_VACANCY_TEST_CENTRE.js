/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblVacancyTestCentre', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    vacancyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_VACANCY',
        key: 'ID'
      },
      field: 'VACANCY_ID'
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
  }, {
    tableName: 'TBL_VACANCY_TEST_CENTRE',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
