const Archive = require("./Archives");
async function addArchive(data, user, filename) {
  console.log(user.branch_name + "_" + data.month + "_" + data.type);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  let sana = new Date().getTime();
  console.log(sana, "time");

  const formattedDate = new Intl.DateTimeFormat("default", options).format(
    sana
  );
  let replacedStr = formattedDate.replace(/\//g, "_");
  console.log(formattedDate, "formattedDate");

  const result = await Archive.create({
    name: user.branch_name + "_" + replacedStr + "_" + data.type,
    // filename,
    file: filename,
    ...data,
  });

  return result;
}

module.exports = addArchive;
