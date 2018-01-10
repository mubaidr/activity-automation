/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catInterviewLocationTime', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    interviewLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_INTERVIEW_LOCATION',
        key: 'ID'
      },
      field: 'INTERVIEW_LOCATION_ID'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'TIME'
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'AVAILABLE'
    },
    panel: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PANEL'
    },
  }, {
    tableName: 'CAT_INTERVIEW_LOCATION_TIME',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
