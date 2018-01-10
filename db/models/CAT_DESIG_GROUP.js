/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('catDesigGroup', {
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
		abbriv: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ABBRIV'
		},
	}, {
		tableName: 'CAT_DESIG_GROUP',
		timestamps: true,
		underscored: true,
		createdAt: 'CREATED_AT',
		updatedAt: 'UPDATED_AT',
		deletedAt: false
	});
};
