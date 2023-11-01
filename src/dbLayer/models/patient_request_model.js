const mongoose = require('mongoose');

const PatientRequestSchema = new mongoose.Schema({
  requests: [
    {
      userIdForPatient: { type: String, required: true },
      patientName: { type: String, required: true },
      patientAge: { type: Number, required: true },
      patientGender: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('PatientRequests', PatientRequestSchema);