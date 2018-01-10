/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catDrivingLicense', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DESCRIPTION'
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
  }, {
    tableName: 'CAT_DRIVING_LICENSE',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
