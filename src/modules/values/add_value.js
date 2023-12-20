const User = require("../users/User");
const Archive = require("./Values");
async function addArchive(data, user) {
  console.log(user.branch_name, "branch_name");
  console.log(data.month, "month");
  console.log(data.year, "year");
  console.log(data.values, "values");

  const result = await Archive.create({
    month: data.month,
    year: data.year,
    branch_name: user.branch_name,
    values: data.values,
  });

  console.log(result, "result");

  return result;
}

module.exports = addArchive;
