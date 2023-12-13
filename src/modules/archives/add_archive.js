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
    name: "nammem",
    // filename, user.branch_name + "_" + replacedStr + "_" + data.type
    file: filename,
    ...data,
  });
  console.log(user._id);
  console.log(result._id);
  console.log(result);
  let userdata = await User.findByIdAndUpdate(user._id, {
    $push: { reports: result._id },
  });
  console.log(userdata);
  return result;
}


module.exports = addArchive;
