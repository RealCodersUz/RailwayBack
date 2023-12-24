const Nalog = require("./Nalog");
const Saldo = require("./Saldo");
const Archives = require("../archives/Archives");
const XLSX = require("xlsx");
const fs = require("fs");
// const { json } = require("body-parser");

async function addNalog(data, user) {
  let dates = [
    { name: "Yanvar", number: "1" },
    { name: "Fevral", number: "2" },
    { name: "Mart", number: "3" },
    { name: "Aprel", number: "4" },
    { name: "May", number: "5" },
    { name: "Iyun", number: "6" },
    { name: "Iyul", number: "7" },
    { name: "Avgust", number: "8" },
    { name: "Sentabr", number: "9" },
    { name: "Oktabr", number: "10" },
    { name: "Noyabr", number: "11" },
    { name: "Dekabr", number: "12" },
  ];
  let targetMonthData = dates.find((month) => month.name === data.month);
  let targetIndex = dates.findIndex((month) => month.name === data.month);

  if (targetIndex !== -1 && targetIndex > 0) {
    let previousMonthData = dates[targetIndex - 1];
    console.log("Previous Month Name:", previousMonthData.name);
    console.log("Previous Month Number:", previousMonthData.number);
  } else {
    console.log("Bunday oy topilmadi yoki u birinchi oy");
  }
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
  // try {
  let saldoData = await Saldo.find({
    branch_name: user.branch_name,
    date: "01." + targetMonthData.number + "." + data.year,
    is_deleted: false,
  });
  console.log(saldoData);
  // } catch (error) {}
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
    let newSaldo = await Saldo.create({
      date: "01." + targetMonthData.number + "." + data.year,
      branch_name: user.branch_name,
      values: data.values,
      // file:
      //   user.branch_name + "_" + data.month + "_" + data.year + "_nalog.xlsx",
      type: "Налог",
    });
    console.log(newSaldo);
    let archive = Archives.create({
      name: user.branch_name + "_" + data.month + "_" + data.year + "_nalog",
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
