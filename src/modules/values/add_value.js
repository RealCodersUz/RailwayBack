const User = require("../users/User");
const Archive = require("./Values");
async function addArchive(data, user) {

  const result = await Archive.create({
    month: "Yanvar",
    year: "2023",
    branch: user.branch_name,
    data,
  });

  console.log(result, "result ifdan tashqarida ");

  // try {
  //   if (result) {
  //     console.log("iffga kirdi ");

  //     let userdata = await User.findByIdAndUpdate(user.id, {
  //       $push: { reports: result._id },
  //     });

  //     console.log(user, "user");
  //     console.log(userdata, "user data");
  //   }
  // } catch (error) {
  //   console.log("Xatocha");
  // }

  // console.log(result, "result soʻngida");
  return result;
}

module.exports = addArchive;
