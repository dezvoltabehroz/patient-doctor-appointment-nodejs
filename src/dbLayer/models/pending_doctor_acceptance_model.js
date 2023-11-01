const mongoose = require('mongoose');

const PatientRequestSchema = new mongoose.Schema({
  userIdForPatient: { type: String, required: true },
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, required: true },
});
const RequestPendingDoctorAcceptanceSchema = new mongoose.Schema({
  doctorId: { type: String },
  patientRequestObj: PatientRequestSchema,
});

module.exports = mongoose.model('RequestPendingDoctorAcceptance', RequestPendingDoctorAcceptanceSchema);