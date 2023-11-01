const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: { type: String },
  gender: { type: String },
  age: { type: String },
  email: { type: String, lowercase: true },
  phoneNumber: { type: String },
  password: { type: String },
  pmdcNumber: { type: String },
  pmdcDocument: { type: String },
  isApproved: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },
  userType: {
    type: String,
    enum: ['doctor', 'patient', 'admin'],
  },
  permissions: { type: [Number], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);