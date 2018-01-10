/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'tblCandidate',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'NAME'
      },
      fatherName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'FATHER_NAME'
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'DOB'
      },
      maritalStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CAT_MARITAL_STATUS',
          key: 'ID'
        },
        field: 'MARITAL_STATUS_ID'
      },
      religionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CAT_RELIGION',
          key: 'ID'
        },
        field: 'RELIGION_ID'
      },
      birthPlace: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'BIRTH_PLACE'
      },
      postalCity: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'POSTAL_CITY'
      },
      postalTehsil: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'POSTAL_TEHSIL'
      },
      postalDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'POSTAL_DISTRICT'
      },
      postalAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'POSTAL_ADDRESS'
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'MOBILE_NO'
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PHONE_NO'
      },
      achievements: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ACHIEVEMENTS'
      },
      primeInterestField: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PRIME_INTEREST_FIELD'
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NATIONALITY'
      },
      genderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CAT_GENDER',
          key: 'ID'
        },
        field: 'GENDER_ID'
      },
      domicileDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'DOMICILE_DISTRICT'
      },
      undertaking: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '((0))',
        field: 'UNDERTAKING'
      },
      undertakingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'UNDERTAKING_DATE'
      },
      loginId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TBL_LOGIN',
          key: 'ID'
        },
        field: 'LOGIN_ID'
      },
      cnic: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'CNIC'
      },
      drivingLicenseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '((1))',
        field: 'DRIVING_LICENSE_ID'
      },
      licenseExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'LICENSE_EXPIRY_DATE'
      }
    },
    {
      tableName: 'TBL_CANDIDATE',
      timestamps: true,
      underscored: true,
      createdAt: 'CREATED_AT',
      updatedAt: 'UPDATED_AT',
      deletedAt: false
    }
  )
}
