const PrescriptionModel = require('../models/prescription_model.js');
const UserModelHelper = require('./user_model_helper.js');

exports.getAllPrescriptionsForGivenUser = async (userId) => await PrescriptionModel.find({ userId });

exports.getAllPrescriptionsByGivenDoctor = async (doctorId) => await PrescriptionModel.find({ doctorId });

exports.getAllPrescriptionsByGivenDoctorForGivenUser = async (userId, doctorId) => await PrescriptionModel.findOne({ userId, doctorId });

exports.addNewPrescription = async (prescriptionObj) => {
  const newPrescription = await PrescriptionModel.create(prescriptionObj);
  return newPrescription;
}
