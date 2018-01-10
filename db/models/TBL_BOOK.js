/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tblBook', {
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
    title1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE_1'
    },
    title2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE_2'
    },
    title3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE_3'
    },
    titleP1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'N',
      field: 'TITLE_P_1'
    },
    titleP2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE_P_2'
    },
    titleP3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'TITLE_P_3'
    },
  }, {
    tableName: 'TBL_BOOK',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
