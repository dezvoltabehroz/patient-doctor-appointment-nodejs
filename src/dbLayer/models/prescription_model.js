const mongoose = require('mongoose');

const PrescribedDrugsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    mode: { type: String, required: true },
    strength: { type: String, required: true },
    dosage: { type: String, required: true },
    timings: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { _id: false }
);

const PrescriptionSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', },
    doctorName: { type: String, required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', },
    patientName: { type: String, required: true },
    patientGender: { type: String, required: true },
    patientAge: { type: Number, required: true },
    prescribedDrugs: [PrescribedDrugsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('prescriptions', PrescriptionSchema);