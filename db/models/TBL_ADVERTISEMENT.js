/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblAdvertisement', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ID'
		},
		advNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'ADV_NUMBER'
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'DESCRIPTION'
		},
		advDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'ADV_DATE'
		},
		advDocument: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'ADV_DOCUMENT'
		},
		closingDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'CLOSING_DATE'
		},
		lastUpdate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'LAST_UPDATE'
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'ACTIVE'
		},
		advCode: {
			type: "NCHAR",
			allowNull: true,
			field: 'ADV_CODE'
		},
	}, {
		tableName: 'TBL_ADVERTISEMENT',
		timestamps: true,
		underscored: true,
		createdAt: 'CREATED_AT',
		updatedAt: 'UPDATED_AT',
		deletedAt: false
	});
};
