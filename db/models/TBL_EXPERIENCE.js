/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblExperience', {
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
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ORGANIZATION'
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DESIGNATION'
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'SALARY'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'START_DATE'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'END_DATE'
    },
    reasonOfLeave: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REASON_OF_LEAVE'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'STATUS'
    },
    specializationFieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_SPECIALIZATION_FIELD',
        key: 'ID'
      },
      field: 'SPECIALIZATION_FIELD_ID'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'DURATION'
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0',
      field: 'IS_VALID'
    },
    majorAssignments: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'MAJOR_ASSIGNMENTS'
    },
  }, {
    tableName: 'TBL_EXPERIENCE',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
