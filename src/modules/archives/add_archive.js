const User = require("../users/User");
const Archive = require("./Archives");
const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
let sana = new Date().getTime();
console.log(sana, "time");
async function addArchive(data, user, filename) {
  console.log(user.branch_name + "_" + data.month + "_" + data.type);

  const formattedDate = new Intl.DateTimeFormat("default", options).format(
    sana
  );
  let replacedStr = formattedDate.replace(/\//g, "_");
  console.log(formattedDate, "formattedDate");

  const result = await Archive.create({
    name: sana + "_" + filename,
    // filename, user.branch_name + "_" + replacedStr + "_" + data.type
    file: filename,
    ...data,
  });

  console.log(result, "result ifdan tashqarida ");

  try {
    if (result) {
      console.log("iffga kirdi ");

      let userdata = await User.findByIdAndUpdate(user.id, {
        $push: { reports: result._id },
      });

      console.log(user, "user");
      console.log(userdata, "user data");
    }
  } catch (error) {
    console.log("Xatocha");
  }

  console.log(result, "result soʻngida");
  return result;
}

module.exports = addArchive;
