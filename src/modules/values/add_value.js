const AdmData = require("../admin data/AdmData");
const User = require("../users/User");
const Values = require("./Values");

async function addValues(data, user) {
  // console.log("qwer",user);
  // console.log(user.branch_name, "branch_name");
  // console.log(data.month, "month");
  // console.log(data.year, "year");
  // console.log(data.values, "values");
  let query = await AdmData.find({ month: data.month, year: data.year });
  console.log(query?.values);
  if (query?.values) {
    let updatedValues = query.values.map(
      (value, index) => value + data.values[index]
    );
    let res = await AdmData.findByIdAndUpdate(
      query._id,
      { values: updatedValues },
      { new: true } // To get the updated document after the update
    );

    console.log(res);
  } else {
    console.log(data.values);
    let newDocument = await AdmData.create({
      month: data.month,
      year: data.year,
      values: data.values,
    });

    // let res = await newDocument.save();
    console.log(newDocument);
  }
  try {
    console.log(user, "user");
    const result = await Values.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      values: data.values,
    });
    console.log(result, "result");

    return result;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addValues;
