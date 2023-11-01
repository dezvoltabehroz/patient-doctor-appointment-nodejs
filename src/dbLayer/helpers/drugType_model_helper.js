const DrugTypeModel = require('../models/drugType_model.js');

exports.getAllDrugTypes = async () => {
  const allDrugTypes = await DrugTypeModel.find({}).select('name -_id');
  return allDrugTypes.map((drug) => drug.name);
}

exports.getDrugTypeByName = async (name) => {
  await DrugTypeModel.findOne({ name });
}

exports.addNewDrugType = async (name, quantityList) => {
  const drugType = await DrugTypeModel.create({ name, quantityList, });
  return drugType;
}
