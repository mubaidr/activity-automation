/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catSpecializationField', {
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
    specializationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_SPECIALIZATION',
        key: 'ID'
      },
      field: 'SPECIALIZATION_ID'
    },
  }, {
    tableName: 'CAT_SPECIALIZATION_FIELD',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
