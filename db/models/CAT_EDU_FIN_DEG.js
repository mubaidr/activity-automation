/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catEduFinDeg', {
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
    eduCertGrpId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_EDU_CERT_GRP',
        key: 'ID'
      },
      field: 'EDU_CERT_GRP_ID'
    },
  }, {
    tableName: 'CAT_EDU_FIN_DEG',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
