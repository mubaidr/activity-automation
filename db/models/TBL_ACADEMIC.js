/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblAcademic', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_CANDIDATE',
        key: 'ID'
      },
      field: 'CANDIDATE_ID'
    },
    eduFinDegId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_EDU_FIN_DEG',
        key: 'ID'
      },
      field: 'EDU_FIN_DEG_ID'
    },
    majorSubjects: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MAJOR_SUBJECTS'
    },
    boardUniv: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'BOARD_UNIV'
    },
    passingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'PASSING_DATE'
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'TOTAL_MARKS'
    },
    obtainedMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'OBTAINED_MARKS'
    },
    criteriaAcademicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_CRITERIA_ACADEMIC',
        key: 'ID'
      },
      field: 'CRITERIA_ACADEMIC_ID'
    },
    percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '((0))',
      field: 'PERCENTAGE'
    },
    divisionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_DIVISION',
        key: 'ID'
      },
      field: 'DIVISION_ID'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'DURATION'
    },
    eduFinDegSubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_EDU_FIN_DEG_SUBJECT',
        key: 'ID'
      },
      field: 'EDU_FIN_DEG_SUBJECT_ID'
    },
    documentName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DocumentName'
    },
  }, {
    tableName: 'TBL_ACADEMIC',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
