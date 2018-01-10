// const util = require('./util')

module.exports = {
  associate: models => {
    // getRelations(models)

    // activity -> activityLog : activityId
    models.activity.hasMany(models.activityLog, {
      foreignKey: 'activityId'
    })
    // login -> activityLog : loginId
    models.login.hasMany(models.activityLog, {
      foreignKey: 'loginId'
    })
    // desigGroup -> desig : desigGroupId
    models.desigGroup.hasMany(models.desig, {
      foreignKey: 'desigGroupId'
    })
    // payscale -> desig : payscaleId
    models.payscale.hasMany(models.desig, {
      foreignKey: 'payscaleId'
    })
    // eduCertGrp -> eduFinDeg : eduCertGrpId
    models.eduCertGrp.hasMany(models.eduFinDeg, {
      foreignKey: 'eduCertGrpId'
    })
    // eduFinDeg -> eduFinDegSubject : eduFinDegId
    models.eduFinDeg.hasMany(models.eduFinDegSubject, {
      foreignKey: 'eduFinDegId'
    })
    // interviewCentre -> interviewLocation : interviewCentreId
    models.interviewCentre.hasMany(models.interviewLocation, {
      foreignKey: 'interviewCentreId'
    })
    // interviewLocation -> interviewLocationTime : interviewLocationId
    models.interviewLocation.hasMany(models.interviewLocationTime, {
      foreignKey: 'interviewLocationId'
    })
    // specialization -> specializationField : specializationId
    models.specialization.hasMany(models.specializationField, {
      foreignKey: 'specializationId'
    })
    // testCentre -> testLocation : testCentreId
    models.testCentre.hasMany(models.testLocation, {
      foreignKey: 'testCentreId'
    })
    // testLocation -> testLocationTime : testLocationId
    models.testLocation.hasMany(models.testLocationTime, {
      foreignKey: 'testLocationId'
    })
    // candidate -> academic : candidateId
    models.candidate.hasMany(models.academic, {
      foreignKey: 'candidateId'
    })
    // eduFinDeg -> academic : eduFinDegId
    models.academic.belongsTo(models.eduFinDeg, {
      foreignKey: 'eduFinDegId'
    })
    // criteriaacademic -> academic : criteriaAcademicId
    models.academic.belongsTo(models.criteriaAcademic, {
      foreignKey: 'criteriaAcademicId'
    })
    // division -> academic : divisionId
    models.academic.belongsTo(models.division, {
      foreignKey: 'divisionId'
    })
    // eduFinDegSubject -> academic : eduFinDegSubjectId
    models.academic.belongsTo(models.eduFinDegSubject, {
      foreignKey: 'eduFinDegSubjectId'
    })
    // vacancy -> application : vacancyId
    models.vacancy.hasMany(models.application, {
      foreignKey: 'vacancyId'
    })
    // appStatus -> application : appStatusId
    models.application.belongsTo(models.appStatus, {
      foreignKey: 'appStatusId'
    })
    // vacancyTestCentre -> application : vacancyTestCentreId
    models.application.belongsTo(models.vacancyTestCentre, {
      foreignKey: 'vacancyTestCentreId'
    })
    // candidate -> application : candidateId
    models.candidate.hasMany(models.application, {
      foreignKey: 'candidateId'
    })
    // candidate -> book : candidateId
    models.candidate.hasMany(models.book, {
      foreignKey: 'candidateId'
    })
    // maritalStatus -> candidate : maritalStatusId
    models.candidate.belongsTo(models.maritalStatus, {
      foreignKey: 'maritalStatusId'
    })
    // religion -> candidate : religionId
    models.candidate.belongsTo(models.religion, {
      foreignKey: 'religionId'
    })
    // gender -> candidate : genderId
    models.candidate.belongsTo(models.gender, {
      foreignKey: 'genderId'
    })
    // login -> candidate : loginId
    models.candidate.belongsTo(models.login, {
      foreignKey: 'loginId'
    })
    // candidate -> centerChangeRequest : candidateId
    models.candidate.hasMany(models.centerChangeRequest, {
      foreignKey: 'candidateId'
    })
    // courseType -> course : courseTypeId
    models.courseType.hasMany(models.course, {
      foreignKey: 'courseTypeId'
    })
    // candidate -> course : candidateId
    models.candidate.hasMany(models.course, {
      foreignKey: 'candidateId'
    })
    // specializationField -> course : specializationFieldId
    models.specializationField.hasMany(models.course, {
      foreignKey: 'specializationFieldId'
    })
    // candidate -> experience : candidateId
    models.candidate.hasMany(models.experience, {
      foreignKey: 'candidateId'
    })
    // specializationField -> experience : specializationFieldId
    models.specializationField.hasMany(models.experience, {
      foreignKey: 'specializationFieldId'
    })
    // finalCandidate -> fcInterview : finalCandidateId
    models.finalCandidate.hasOne(models.fcInterview, {
      foreignKey: 'finalCandidateId'
    })
    // interviewLocationTime -> fcInterview : interviewLocationTimeId
    models.interviewLocationTime.hasMany(models.fcInterview, {
      foreignKey: 'interviewLocationTimeId'
    })
    // finalCandidate -> fcTest : finalCandidateId
    models.finalCandidate.hasOne(models.fcTest, {
      foreignKey: 'finalCandidateId'
    })
    // testLocationTime -> fcTest : testLocationTimeId
    models.testLocationTime.hasMany(models.fcTest, {
      foreignKey: 'testLocationTimeId'
    })
    // application -> finalCandidate : applicationId
    models.application.hasOne(models.finalCandidate, {
      foreignKey: 'applicationId'
    })
    // accountType -> login : accountTypeId
    models.login.belongsTo(models.accountType, {
      foreignKey: 'accountTypeId'
    })
    // candidate -> publication : candidateId
    models.candidate.hasMany(models.publication, {
      foreignKey: 'candidateId'
    })
    // desig -> vacancy : desigId
    models.desig.hasMany(models.vacancy, {
      foreignKey: 'desigId'
    })
    // advertisement -> vacancy : advertisementId
    models.advertisement.hasMany(models.vacancy, {
      foreignKey: 'advertisementId'
    })
    // appStatus -> vacancy : appStatusId
    models.appStatus.hasMany(models.vacancy, {
      foreignKey: 'appStatusId'
    })
    // vacancy -> vacancyCertificate : vacancyId
    models.vacancy.hasMany(models.vacancyCertificate, {
      foreignKey: 'vacancyId'
    })
    // eduFinDegSubject -> vacancyCertificate : eduFinDegSubjectId
    models.eduFinDegSubject.hasMany(models.vacancyCertificate, {
      foreignKey: 'eduFinDegSubjectId'
    })
    // vacancy -> vacancyInterviewCentre : vacancyId
    models.vacancy.hasMany(models.vacancyInterviewCentre, {
      foreignKey: 'vacancyId'
    })
    // interviewCentre -> vacancyInterviewCentre : interviewCentreId
    models.interviewCentre.hasMany(models.vacancyInterviewCentre, {
      foreignKey: 'interviewCentreId'
    })
    // specialization -> vacancySpecialization : specializationId
    models.specialization.hasMany(models.vacancySpecialization, {
      foreignKey: 'specializationId'
    })
    // vacancy -> vacancySpecialization : vacancyId
    models.vacancy.hasMany(models.vacancySpecialization, {
      foreignKey: 'vacancyId'
    })
    models.vacancySpecialization.belongsTo(models.vacancy, {
      foreignKey: 'vacancyId'
    })
    // vacancy -> vacancyTestCentre : vacancyId
    models.vacancy.hasMany(models.vacancyTestCentre, {
      foreignKey: 'vacancyId'
    })
    // testCentre -> vacancyTestCentre : testCentreId
    models.testCentre.hasMany(models.vacancyTestCentre, {
      foreignKey: 'testCentreId'
    })
  }
}

/*
function toCamelCase (str) {
  const tmp = str
    .toLowerCase()
    .split('_')
    .map(item => item[0].toUpperCase() + item.substring(1))
    .join('')

  return tmp[0].toLowerCase() + tmp.substring(1)
}

function getRelations (models) {
  Object.keys(models).forEach(modelName => {
    const model = models[modelName]

    Object.getOwnPropertyNames(model.attributes).forEach(attribute => {
      const { references } = model.attributes[attribute]

      if (references) {
        const refModel = models[util.getModelName(references.model)]
        const refName = util.getModelName(refModel.tableName)
        const name = util.getModelName(model.tableName)
        const prop = toCamelCase(model.attributes[attribute].field)
        console.log(`\n// ${refName} -> ${name} : ${prop}`)
      }
    })
  })
}
*/
