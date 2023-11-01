const DrugModeModel = require('../models/drugMode_model.js');

exports.getAllDrugModes = async () => {
  const allDrugModes = await DrugModeModel.find({}).select('name -_id');
  return allDrugModes.map((drug) => drug.name);
}

exports.getDrugModeByName = async (drugModeName) => {
  await DrugModeModel.findOne({ name: drugModeName })
}

exports.addNewDrugMode = async (drugModeName) => {
  const drugMode = await DrugModeModel.create({ name: drugModeName, });
  return drugMode;
}