const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema(
  {
    expression: { type: String, required: true },
    translation: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('translations', translationSchema);