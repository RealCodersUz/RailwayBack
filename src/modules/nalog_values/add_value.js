const Nalog = require("./Nalog");
const Saldo = require("./Saldo");
const Archives = require("../archives/Archives");
const XLSX = require("xlsx");
const fs = require("fs");
const { BadRequestError } = require("../../shared/errors");
// const { start } = require("repl");
// const { json } = require("body-parser");

async function addNalog(data, user) {
  // console.log(data, "DATA");
  let dates = [
    { name: "кв-1", number: "1" },
    { name: "кв-2", number: "2" },
    { name: "кв-3", number: "3" },
    { name: "кв-4", number: "4" },
    // { name: "May", number: "5" },
    // { name: "Iyun", number: "6" },
    // { name: "Iyul", number: "7" },
    // { name: "Avgust", number: "8" },
    // { name: "Sentabr", number: "9" },
    // { name: "Oktabr", number: "10" },
    // { name: "Noyabr", number: "11" },
    // { name: "Dekabr", number: "12" },
  ];
  let targetMonthData = dates.find((month) => month.name === data.month);
  let targetIndex = dates.findIndex((month) => month.name === data.month);

  // console.log(targetIndex, "Bu index");
  try {
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

    console.log("Excel fayli generatsiya qilindi");
    // if (user.role == "super_admin" && data.branch_name == "Общий") {

    let start;
    if (targetIndex !== -1 && targetIndex > 0) {
      let previousMonthData = dates[targetIndex - 1];
      console.log("Previous Month Name:", previousMonthData.name);
      console.log("Previous Month Number:", previousMonthData.number);
      try {
        start = await Saldo.find({
          month: previousMonthData.name,
          year: data.year,
          branch_name: user.branch_name,
        });
        console.log(start, "start");
      } catch (error) {
        console.error(error);
      }
    } else {
      let previousMonthData = dates[3];
      console.log("Previous Month Name:", previousMonthData.name);
      console.log("Previous Month Number:", previousMonthData.number);
      console.log(data.year - 1);
      try {
        start = await Saldo.find({
          month: previousMonthData.name,
          year: data.year - 1,
          branch_name: user.branch_name,
        });
        console.log(start, "start");
      } catch (error) {
        console.error(error);
        return new BadRequestError("Ошибка ввода!!!");
      }
      // console.log("Bunday oy topilmadi yoki u birinchi oy");
    }
    let archive = Archives.create({
      name:
        user.branch_name + "_" + data.month + "_" + data.year + "_nalog.xlsx",
      month: data.month,
      year: data.year,
      branch_name: user.branch_name,
      file:
        user.branch_name + "_" + data.month + "_" + data.year + "_nalog.xlsx",
      type: "Налог",
    });
    if (archive) {
      let final = {
        debit: [],
        kredit: [],
      };
      console.log(
        "first",
        start[0].values,
        start[0].values.debit,
        start[0].values.kredit
        // start[0].values.debit.length,
        // start[0].values.kredit.length
      );
      console.log(
        "second",
        start[0],
        start[0].values.debit.length > 0,
        start[0].values.kredit.length > 0
      );
      if (
        start[0] &
        (start[0].values.debit.length > 0) &
        (start[0].values.kredit.length > 0)
      ) {
        for (let i = 0; i < start[0].values.debit.length; i++) {
          const element = start[0].values.debit[i];
          console.log(element);

          let qiymat =
            start[0].values.kredit[i] +
            data.values.uplacheno[i] -
            data.values.rashyot[i] -
            start[0].values.debit[i];

          console.log(qiymat, "qiymat");
          final.kredit.push(qiymat > 0 ? qiymat : 0);
          final.debit.push(qiymat < 0 ? Math.abs(qiymat) : 0);
        }
      }
      let newSaldo = await Saldo.create({
        year: data.year,
        month: data.month,
        values: final,
        branch_name: user.branch_name,
      });
      console.log(newSaldo);
      console.log("start", start[0], "final", final, "values", {
        debit: data.values.uplacheno,
        kredit: data.values.rashyot,
      });
      const result = await Nalog.create({
        month: data.month,
        year: data.year,
        branch_name: user.branch_name,
        file: data.file,
        start: start[0].values,
        values: {
          uplacheno: data.values.uplacheno,
          rashyot: data.values.rashyot,
        },
        final,
      });
      console.log(result, "result");
      let query = await Nalog.findOne({
        month: data.month,
        year: data.year,
        branch_name: "Общий",
      });
      if (query) {
        let updatedValues = {
          debit: [],
          kredit: [],
        };
        updatedValues.debit = query[0].values.debit.map(
          (value, index) => value + data.values.debit[index]
        );
        updatedValues.kredit = query[0].values.kredit.map(
          (value, index) => value + data.values.kredit[index]
        );
        let updatedStart = query[0].start.map(
          (value, index) => value + data.values[index]
        );
        let updatedFinal = query[0].values.map(
          (value, index) => value + data.values[index]
        );
        console.log(updatedValues);
        console.log(updatedStart);
        console.log(updatedFinal);
        let res = await Nalog.findByIdAndUpdate(
          query[0]._id,
          { values: updatedValues },
          { start: updatedStart },
          { final: updatedFinal },
          { new: true }
        );
      } else {
        await Nalog.create({
          year: data.year,
          month: data.month,
          branch_name: "Общий",
          values: data.values,
          start: start[0].values,
          final,
        });
      }
      // }
      return result;
    }
    // return { status: 400, message: "Oldin bunaqasi bogan" };
    return new BadRequestError("Такая информация была ранее введена!!!");
  } catch (error) {
    console.error(error.message);
    return new BadRequestError("Ошибка ввода!!!");
    // return { error: error.message };
  }
}

module.exports = addNalog;
