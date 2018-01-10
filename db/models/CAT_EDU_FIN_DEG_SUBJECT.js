/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catEduFinDegSubject', {
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
    eduFinDegId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_EDU_FIN_DEG',
        key: 'ID'
      },
      field: 'EDU_FIN_DEG_ID'
    },
  }, {
    tableName: 'CAT_EDU_FIN_DEG_SUBJECT',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
