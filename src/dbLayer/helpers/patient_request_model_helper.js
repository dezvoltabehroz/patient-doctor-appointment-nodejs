const PatientRequestModel = require('../models/patient_request_model.js');

exports.popOldestPatientRequest = async () => {
  let oldestPatientRequest = null;
  const patientRequestsArray = await PatientRequestModel.findOne({});
  if (patientRequestsArray && patientRequestsArray.requests.length) {
    oldestPatientRequest = patientRequestsArray.requests.shift();
    patientRequestsArray.save();
  }
  return oldestPatientRequest;
}

exports.addNewPatientRequest = async ({ userIdForPatient, patientName, patientGender, patientAge }, addToFront = false,) => {
  const patientRequestsArray = await PatientRequestModel.findOne({});
  const newPatientRequestObj = { userIdForPatient, patientName, patientGender, patientAge, };
  if (patientRequestsArray) {

    if (addToFront) patientRequestsArray.requests.unshift(newPatientRequestObj);
    else patientRequestsArray.requests.push(newPatientRequestObj);

    var patientSaveRes = await patientRequestsArray.save();
  } else {
    var patientSaveRes = await PatientRequestModel.create({ requests: [newPatientRequestObj], });
  }
  return patientSaveRes;
}

exports.requestExists = async (userIdForPatient) => {
  const patientRequessArray = await PatientRequestModel.findOne({});
  return (
    patientRequessArray &&
    patientRequessArray.requests.findIndex((item) => item.userIdForPatient === userIdForPatient,) !== -1);
}

