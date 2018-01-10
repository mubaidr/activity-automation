/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblVacancyInterviewCentre', {
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
    interviewCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_INTERVIEW_CENTRE',
        key: 'ID'
      },
      field: 'INTERVIEW_CENTRE_ID'
    },
  }, {
    tableName: 'TBL_VACANCY_INTERVIEW_CENTRE',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
