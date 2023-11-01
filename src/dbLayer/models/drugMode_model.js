const mongoose = require('mongoose');

const DrugModeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('drugModes', DrugModeSchema);