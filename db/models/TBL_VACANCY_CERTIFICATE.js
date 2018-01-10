/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblVacancyCertificate', {
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
    eduFinDegSubjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CAT_EDU_FIN_DEG_SUBJECT',
        key: 'ID'
      },
      field: 'EDU_FIN_DEG_SUBJECT_ID'
    },
  }, {
    tableName: 'TBL_VACANCY_CERTIFICATE',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
