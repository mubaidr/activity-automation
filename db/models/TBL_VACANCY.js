/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblVacancy', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    desigId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_DESIG',
        key: 'ID'
      },
      field: 'DESIG_ID'
    },
    advertisementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_ADVERTISEMENT',
        key: 'ID'
      },
      field: 'ADVERTISEMENT_ID'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DESCRIPTION'
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'QUESTION'
    },
    checkAcademicDetails: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0',
      field: 'CHECK_ACADEMIC_DETAILS'
    },
    appStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((2))',
      references: {
        model: 'CAT_APP_STATUS',
        key: 'ID'
      },
      field: 'APP_STATUS_ID'
    },
  }, {
    tableName: 'TBL_VACANCY',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
