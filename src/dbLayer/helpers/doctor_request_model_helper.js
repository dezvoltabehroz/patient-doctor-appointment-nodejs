const DoctorRequestModel = require('../models/doctor_request_model.js');

exports.requestExists = async (doctorId) => {
  const doctorRequest = await DoctorRequestModel.findOne({ doctorId });
  return !!doctorRequest;
};

exports.popOldestDoctorRequest = async () => {
  const oldestDoctorRequest = await DoctorRequestModel.findOne({}).sort({ createdAt: 1, });
  if (oldestDoctorRequest) {
    await DoctorRequestModel.deleteOne({ _id: oldestDoctorRequest._id });
  }
  return oldestDoctorRequest?.doctorId;
};

exports.deleteDoctorRequest = async (doctorIdToDelete) => await DoctorRequestModel.deleteOne({ doctorId: doctorIdToDelete });

exports.addNewDoctorRequest = async (doctorId) => await DoctorRequestModel.create({ doctorId });

