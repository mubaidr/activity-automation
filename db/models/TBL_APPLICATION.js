/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblApplication', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    vacId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_VACANCY',
        key: 'ID'
      },
      field: 'VAC_ID'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_APP_STATUS',
        key: 'ID'
      },
      field: 'STATUS'
    },
    recordEntryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'RECORD_ENTRY_DATE'
    },
    applicationNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'APPLICATION_NO'
    },
    testCentre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TBL_VACANCY_TEST_CENTRE',
        key: 'ID'
      },
      field: 'TEST_CENTRE'
    },
    questionStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'QUESTION_STATUS'
    },
    ledgerReferenceNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'LEDGER_REFERENCE_NO'
    },
    isChanneled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'IS_CHANNELED'
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TBL_CANDIDATE',
        key: 'ID'
      },
      field: 'CANDIDATE_ID'
    },
    undertaking: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'UNDERTAKING'
    },
    isPreffered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0',
      field: 'IS_PREFFERED'
    },
    hasWorkedInSpd: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'hasWorkedInSPD'
    },
  }, {
    tableName: 'TBL_APPLICATION',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
