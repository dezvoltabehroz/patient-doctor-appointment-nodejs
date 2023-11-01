const RequestPendingDoctorAcceptanceModel = require('../models/pending_doctor_acceptance_model.js');

exports.getRequestPendingDoctorAcceptanceForGivenDoctor = async (doctorId) =>
  await RequestPendingDoctorAcceptanceModel.findOne({ doctorId });

exports.getRequestPendingDoctorAcceptanceForGivenPatient = async (patientId) =>
  await RequestPendingDoctorAcceptanceModel.findOne({ 'patientRequestObj.userIdForPatient': patientId, });

exports.deleteRequestPendingDoctorAcceptanceForGivenDoctor = async (doctorId,) =>
  await RequestPendingDoctorAcceptanceModel.deleteOne({ doctorId });

exports.addRequestPendingDoctorAcceptanceForGivenDoctor = async (doctorId, patientRequestObj,) =>
  await RequestPendingDoctorAcceptanceModel.create({ doctorId, patientRequestObj, });
