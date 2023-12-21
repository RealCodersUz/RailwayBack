// const AdmData = require("../admin_data/AdmData");
// const User = require("../users/User");
const Rasxod = require("./Rasxod");

async function addRasxod(data, user) {
  // console.log("qwer",user);
  // console.log(user.branch_name, "branch_name");
  // console.log(data.month, "month");
  // console.log(data.year, "year");
  // console.log(data.values, "values");
  // let query = await AdmData.find({ month: data.month, year: data.year });
  // console.log(query);
  // if (query[0]) {
  // console.log(query[0].values, "ifga kirdi");
  //   let updatedValues = query[0].values.map(
  //     (value, index) => value + data.values[index]
  //   );
  //   console.log(updatedValues, "updated");
  //   let res = await AdmData.findByIdAndUpdate(
  //     query[0]._id,
  //     { values: updatedValues },
  //     { new: true } // To get the updated document after the update
  //   );

  //   console.log(res, "bu res");
  // } else {
  // console.log(data.values);
  // let newDocument = await AdmData.create({
  //   month: data.month,
  //   year: data.year,
  //   values: data.values,
  // });

  // let res = await newDocument.save();
  //   console.log(newDocument);
  // }
  try {
    console.log(user, "user");
    const result = await Rasxod.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      values: data.values,
    });
    console.log(result, "added");

    return result;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addRasxod;
