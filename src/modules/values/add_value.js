const User = require("../users/User");
const Archive = require("./Values");

async function addArchive(data, user) {
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
