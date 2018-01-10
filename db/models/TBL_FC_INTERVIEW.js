/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblFcInterview', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    finalCandidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_FINAL_CANDIDATE',
        key: 'ID'
      },
      field: 'FINAL_CANDIDATE_ID'
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MARKS'
    },
    interviewLocationTimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_INTERVIEW_LOCATION_TIME',
        key: 'ID'
      },
      field: 'INTERVIEW_LOCATION_TIME_ID'
    },
    absent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0',
      field: 'ABSENT'
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REMARKS'
    },
  }, {
    tableName: 'TBL_FC_INTERVIEW',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
