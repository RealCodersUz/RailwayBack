const Nalog = require("./Nalog");
const Archives = require("../archives/Archives");
const { json } = require("body-parser");

async function addNalog(data, user) {
  const wb = XLSX.utils.book_new();
  const wsName = "Sheet1";
  const ws = XLSX.utils.json_to_sheet(data.file);
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
      "_nalog.xlsx",
    // wb,
    excelBuffer
  );

  console.log("Excel fayli generatsiya qilindi: ${}.xlsx");
  try {
  } catch (error) {}
  // let query = await AdmData.find({ month: data.month, year: data.year });
  // console.log(query);
  // if (query[0]) {
  //   console.log(query[0].Nalog, "ifga kirdi");
  //   let updatedNalog = query[0].Nalog.map(
  //     (value, index) => value + data.Nalog[index]
  //   );
  //   console.log(updatedNalog, "updated");
  //   let res = await AdmData.findByIdAndUpdate(
  //     query[0]._id,
  //     { Nalog: updatedNalog },
  //     { new: true } // To get the updated document after the update
  //   );

  //   console.log(res, "bu res");
  // } else {
  //   console.log(data.Nalog);
  //   let newDocument = await AdmData.create({
  //     month: data.month,
  //     year: data.year,
  //     Nalog: data.Nalog,
  //   });

  //   // let res = await newDocument.save();
  //   console.log(newDocument);
  // }
  try {
    console.log(user, "user");
    let archive = Archives.create({
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      file:
        user.branch_name + "_" + data.month + "_" + data.year + "_nalog.xlsx",
      type: "Налог",
    });
    if (archive) {
      const result = await Nalog.create({
        month: data.month,
        year: data.year,
        branch_name: user.branch_name,
        values: data.values,
      });
      console.log(result, "result");
      return result;
    }
    return { status: 400, message: "Oldin bunaqasi bogan" };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = addNalog;
