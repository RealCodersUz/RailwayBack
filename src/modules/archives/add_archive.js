const User = require("../users/User");
const Archive = require("./Archives");
async function addArchive(data, user, filename) {
  console.log(user.branch_name + "_" + data.month + "_" + data.type);

  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  let sana = new Date().getTime();

  const monthsInUzbek = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let monthNameInUzbek = monthsInUzbek[month];
  console.log(monthNameInUzbek);

  console.log(sana, "time");
  const formattedDate = new Intl.DateTimeFormat("default", options).format(
    sana
  );
  let replacedStr = formattedDate.replace(/\//g, "_");
  console.log(formattedDate, "formattedDate");

  const result = await Archive.create({
    name:
      user.branch_name + "_" + data.month + "_" + data.year + "_" + data.type,
    // filename, user.branch_name + "_" + replacedStr + "_" + data.type
    file: filename,
    branch_name: user.branch_name,
    // month: monthNameInUzbek,
    // year: year,
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
    return error();
  }

  console.log(result, "result soʻngida");
  return result;
}

module.exports = addArchive;
