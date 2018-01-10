/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblFcTest', {
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
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '((0))',
      field: 'MARKS'
    },
    testLocationTimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_TEST_LOCATION_TIME',
        key: 'ID'
      },
      field: 'TEST_LOCATION_TIME_ID'
    },
  }, {
    tableName: 'TBL_FC_TEST',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
