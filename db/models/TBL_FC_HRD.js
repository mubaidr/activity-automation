/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblFcHrd', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    fcInterviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_FC_INTERVIEW',
        key: 'ID'
      },
      field: 'FC_INTERVIEW_ID'
    },
    recordEntryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'RECORD_ENTRY_DATE'
    },
    recordEnteredBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'RECORD_ENTERED_BY'
    },
  }, {
    tableName: 'TBL_FC_HRD',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
