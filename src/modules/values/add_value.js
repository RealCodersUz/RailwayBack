const AdmData = require("../admin data/AdmData");
const User = require("../users/User");
const Archive = require("./Values");

async function addArchive(data, user) {
  // console.log("qwer",user);
  // console.log(user.branch_name, "branch_name");
  // console.log(data.month, "month");
  // console.log(data.year, "year");
  // console.log(data.values, "values");
  let query = await AdmData.find({ month: data.month, year: data.year });
  console.log(query);
  if (query) {
    console.log("ifga kirdi query");
  }
  try {
    console.log(user, "user");
    const result = await Archive.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      values: data.values[0].data,
    });
    console.log(result, "result");

    return result;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addArchive;
