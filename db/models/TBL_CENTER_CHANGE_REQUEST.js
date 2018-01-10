/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblCenterChangeRequest', {
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
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '(getdate())',
      field: 'DATETIME'
    },
    currentCenter: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'CURRENT_CENTER'
    },
    requestedCenter: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'REQUESTED_CENTER'
    },
    applicationNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPLICATION_NO'
    },
    entertained: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
      field: 'ENTERTAINED'
    },
  }, {
    tableName: 'TBL_CENTER_CHANGE_REQUEST',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
