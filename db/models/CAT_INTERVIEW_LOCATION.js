/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catInterviewLocation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    abbriv: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ABBRIV'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'ADDRESS'
    },
    interviewCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CAT_INTERVIEW_CENTRE',
        key: 'ID'
      },
      field: 'INTERVIEW_CENTRE_ID'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      field: 'CAPACITY'
    },
  }, {
    tableName: 'CAT_INTERVIEW_LOCATION',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false
  });
};
