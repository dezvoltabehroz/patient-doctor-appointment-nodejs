const mongoose = require('mongoose');

const DrugTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    modes: { type: [String], required: true },
    strengths: { type: [String], required: true },
  },
  { _id: false, timestamps: true },
);

const DrugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  types: [DrugTypeSchema],
});

module.exports = mongoose.model('drugs', DrugSchema);