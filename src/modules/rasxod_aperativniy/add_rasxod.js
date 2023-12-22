// const AdmData = require("../admin_data/AdmData");
// const User = require("../users/User");
const Rasxod = require("./Rasxod");
const Archives = require("../archives/Archives");
const XLSX = require("xlsx");
const fs = require("fs");

async function addRasxod(data, user) {
  console.log("1", data.file);
  // console.log("2", data.file[0]);
  const wb = XLSX.utils.book_new();
  const wsName = "Sheet1";
  const ws = XLSX.utils.json_to_sheet(data.file[0]);
  XLSX.utils.book_append_sheet(wb, ws, wsName);

  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "buffer",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  fs.writeFileSync(
    "public/" +
      user.branch_name +
      "_" +
      data.month +
      "_" +
      data.year +
      "_rasxod_aperativniy.xlsx",
    // wb,
    excelBuffer
  );

  console.log("Excel fayli generatsiya qilindi: new.xlsx");

  try {
    console.log(user, "user");
    let archive = Archives.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      file:
        user.branch_name +
        "_" +
        data.month +
        "_" +
        data.year +
        "_rasxod_aperativniy.xlsx",
      type: "Расходы",
    });
    console.log(archive);
    if (archive) {
      const result = await Rasxod.create({
        month: data.month,
        year: data.year,
        branch_name: user.branch_name,
        values: data.values,
        file: data.file,
      });
      console.log(result, "added");
      return result;
    }
    return;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addRasxod;
