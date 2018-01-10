/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblVacancySpecialization', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    specializationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_SPECIALIZATION',
        key: 'ID'
      },
      field: 'SPECIALIZATION_ID'
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
  }, {
    tableName: 'TBL_VACANCY_SPECIALIZATION',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
