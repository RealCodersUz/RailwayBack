const AdmData = require("../admin_data/AdmData");
const User = require("../users/User");
const Values = require("./Values");

async function addValues(data, user) {
  let query = await AdmData.find({ month: data.month, year: data.year });
  if (query[0]) {
    let updatedValues = query[0].values.map(
      (value, index) => value + data.values[index]
    );
    let res = await AdmData.findByIdAndUpdate(
      query[0]._id,
      { values: updatedValues },
      { new: true }
    );
  } else {
    let newDocument = await AdmData.create({
      month: data.month,
      year: data.year,
      values: data.values,
      names: data.names,
    });
  }
  try {
    const result = await Values.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      values: data.values,
      names: data.names,
    });

    return result;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addValues;
