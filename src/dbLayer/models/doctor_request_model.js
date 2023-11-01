const mongoose = require('mongoose');

const DoctorRequestSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DoctorRequests', DoctorRequestSchema);