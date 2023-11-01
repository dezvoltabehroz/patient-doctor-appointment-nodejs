const mongoose = require('mongoose');

const DrugTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantityList: { type: [String] },
});

module.exports = mongoose.model('drugTypes', DrugTypeSchema);